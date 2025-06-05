// Update in backend prints -2, not in database


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userServices from "../services/userService";
import propertyService from "../services/propertyService";
import ConfirmDialog from "../components/ConfirmDialog";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        _id: '',
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        avatar: ''
    });
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        avatar: ''
    });
    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        username: ''
    });
    const [properties, setProperties] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isConfirmOpen, setConfirmOpen] = useState(false);
    const [propertyToDelete, setPropertyToDelete] = useState(null);

    // Fetch user data and properties
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                // Fetch user profile (this will internally use the cookie to get userId)
                const userResponse = await new userServices().getProfile();

                setUser(userResponse);
                setFormData({
                    firstname: userResponse.firstname,
                    lastname: userResponse.lastname,
                    username: userResponse.username,
                    avatar: userResponse.avatar
                });

                // Fetch user's properties using the userId from the user response
                const propertiesResponse = await new propertyService().getPropertyByUserId();

                setProperties(propertiesResponse);
            } catch (error) {
                toast.error('Failed to fetch profile data');
                console.error('Error fetching profile:', error);
                if (error.response?.status === 401 || error.response?.status === 403) {
                    navigate('/login');
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();

    }, [navigate]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        // Clear error when user types
        setErrors(prev => ({ ...prev, [name]: '' }));

        // Handle file upload differently
        if (name === 'avatar') {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const validateField = (e) => {
        const { name, value } = e.target;
        let error = '';

        if (!value.trim()) {
            error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        }

        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (!formData.firstname.trim()) {
            newErrors.firstname = 'First name is required';
            isValid = false;
        }

        if (!formData.lastname.trim()) {
            newErrors.lastname = 'Last name is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleUpdateProfile = async () => {
        if (!validateForm()) return;

        try {
            // Prepare update data (JSON format)
            const updateData = new FormData();
            updateData.append('firntname', formData.firstname);
            updateData.append('lastname', formData.lastname);
            updateData.append('username', formData.username);

            if (formData.avatar instanceof File) {
                updateData.append('avatar', formData.avatar);
            }

            const response = await new userServices().updateProfile(updateData);

            // Update the user state with the new data
            setIsEditing(false);
            toast.success('Profile updated successfully!', {
                autoClose: 2000,
            });

            const userResponse = await new userServices().getProfile();
            setUser(userResponse);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
            console.error('Update error:', error);
        }
    };

    const handleDeleteProperty = async () => {
        try {
            await new propertyService().deletePropertyById(propertyToDelete);

            const propertiesResponse = await new propertyService().getPropertyByUserId();
            propertiesResponse.map(property => ({
                ...property,
                images: property.images.map(image => ({ original: image })),
            }));

            setProperties(propertiesResponse);
            setConfirmOpen(false);
            toast.success('Property deleted successfully', {
                autoClose: 2000
            });
        } catch (error) {
            toast.error('Failed to delete property');
            console.error('Delete error:', error);
        }
    };

    if (isLoading) {
        return <div className="text-center mt-5">Loading profile...</div>;
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    {/* Profile Card */}
                    <div className="card shadow mb-4">
                        <div className="card-body text-center p-4">
                            <img
                                src={user.avatar || '/default-avatar.png'}
                                alt="Profile"
                                className="rounded-circle mb-3"
                                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                            />

                            {isEditing ? (
                                <div>
                                    <div className="mb-4">
                                        <label htmlFor="firstname" className="form-label" style={{ fontSize: '1.25rem' }}>First Name</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="firstname"
                                            name="firstname"
                                            placeholder="Enter First Name"
                                            value={formData.firstname}
                                            onChange={handleInputChange}
                                            onBlur={validateField}
                                        />
                                        <div className="text-danger small" style={{ fontSize: '1rem' }}>{errors.firstname}</div>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="lastname" className="form-label" style={{ fontSize: '1.25rem' }}>Last Name</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="lastname"
                                            name="lastname"
                                            placeholder="Enter Last Name"
                                            value={formData.lastname}
                                            onChange={handleInputChange}
                                            onBlur={validateField}
                                        />
                                        <div className="text-danger small" style={{ fontSize: '1rem' }}>{errors.lastname}</div>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="username" className="form-label" style={{ fontSize: '1.25rem' }}>Username</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="username"
                                            name="username"
                                            placeholder="Enter Username"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            onBlur={validateField}
                                        />
                                        <div className="text-danger small" style={{ fontSize: '1rem' }}>{errors.username}</div>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="avatar" className="form-label" style={{ fontSize: '1.25rem' }}>Profile Picture</label>
                                        <input
                                            type="file"
                                            className="form-control form-control-lg"
                                            id="avatar"
                                            name="avatar"
                                            onChange={handleInputChange}
                                            onBlur={validateField}
                                        />
                                    </div>
                                    <button className="btn btn-success m-2" onClick={handleUpdateProfile}>Save Changes</button>
                                    <button className="btn btn-secondary m-2" onClick={() => setIsEditing(false)}>Cancel</button>
                                </div>
                            ) : (
                                <>
                                    <h2 className="card-title">{user.firstname} {user.lastname}</h2>
                                    <p className="text-muted">@{user.username}</p>
                                    <p className="card-text">{user.email}</p>

                                    <div className="mt-3">
                                        <button className="btn btn-primary me-2" onClick={handleEditClick}>
                                            Edit Profile
                                        </button>
                                        <button className="btn btn-success" onClick={() => navigate('/property/add')}>
                                            Add Property
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Properties Section */}
                    <h4 className="mb-4">My Properties</h4>

                    {properties.length > 0 ? (
                        <div className="row">
                            {properties.map(property => (
                                <div className="col-md-6 mb-4" key={property._id}>
                                    <div className="card h-100">
                                        <img
                                            src={property.images?.[0] || '/property-placeholder.jpg'}
                                            className="card-img-top"
                                            alt={property.title}
                                            style={{ height: '180px', objectFit: 'cover' }}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{property.title || 'No Title'}</h5>
                                            <div className="text-muted mb-2">
                                                <i className="bi bi-geo-alt"></i> {property.location || 'Location not specified'}
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <span className="text-primary fw-bold">
                                                    ${property.price || '0'}
                                                </span>
                                                <span className="badge bg-secondary">
                                                    {property.bhk || 'N/A'} BHK
                                                </span>
                                            </div>
                                            <div className="d-flex justify-content-between text-muted small">
                                                <span>
                                                    <i className="bi bi-arrows-fullscreen"></i> {property.area || '0'} sq.ft
                                                </span>
                                                <span className={property.status === 'Available' ? 'text-success' : 'text-warning'}>
                                                    {property.status || 'Status unknown'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="card-footer bg-transparent">
                                            <div className="d-flex justify-content-between">
                                                <button
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() => navigate(`/flat/${property._id}`)}
                                                >
                                                    <i className="bi bi-eye"></i> View
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-secondary"
                                                    onClick={() => navigate(`/property/edit/${property._id}`)}
                                                >
                                                    <i className="bi bi-pencil"></i> Edit
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => {
                                                        setPropertyToDelete(property._id);
                                                        setConfirmOpen(true);
                                                    }}
                                                >
                                                    <i className="bi bi-trash"></i> Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="alert alert-info">
                            You haven't listed any properties yet.
                        </div>
                    )}
                </div>
            </div>


            <ConfirmDialog
                isOpen={isConfirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleDeleteProperty}
                message="Are you sure you want to delete this property?"
                title="Confirm Delete"
                btnText="Delete"
            />
        </div>
    );
}