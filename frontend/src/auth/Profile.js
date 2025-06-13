import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userServices from "../services/userService";
import propertyService from "../services/propertyService";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import { toast } from 'react-toastify';
import Loader from '../components/ui/Loader'
import 'react-toastify/dist/ReactToastify.css';
import '../static/Profile.css'

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
    const [isUpdating, setUpdating] = useState(false);
    const [isDeleting, setDeleting] = useState(false);


    // 🔁 INSIDE useEffect: fetchData
    const fetchData = async () => {
        try {
            setIsLoading(true);

            let userResponse = {};
            let propertiesResponse = [];

            try {
                userResponse = await new userServices().getProfile();
            } catch (userErr) {
                toast.error('Failed to fetch user profile');
                console.error('User Fetch Error:', userErr);
                if (userErr.response?.status === 401 || userErr.response?.status === 403) {
                    navigate('/login');
                    return;
                }
            }

            setUser(userResponse);
            setFormData({
                firstname: userResponse.firstname,
                lastname: userResponse.lastname,
                username: userResponse.username,
                avatar: userResponse.avatar
            });

            try {
                propertiesResponse = await new propertyService().getPropertyByUserId();
            } catch (propertyErr) {
                toast.error('Failed to fetch properties');
                console.error('Properties Fetch Error:', propertyErr);
            }

            setProperties(propertiesResponse);
        } catch (error) {
            toast.error('Failed to load profile data');
            console.error('Unknown Profile Load Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch user data and properties
    useEffect(() => {
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

    // 🔁 IN handleUpdateProfile
    const handleUpdateProfile = async () => {
        if (!validateForm()) return;
        setUpdating(true);

        try {
            const updateData = new FormData();
            updateData.append('firstname', formData.firstname); // fix typo: 'firntname'
            updateData.append('lastname', formData.lastname);
            updateData.append('username', formData.username);

            if (formData.avatar instanceof File) {
                updateData.append('avatar', formData.avatar);
            }

            await new userServices().updateProfile(updateData);

            let updatedUser = {};
            try {
                updatedUser = await new userServices().getProfile();
            } catch (err) {
                toast.error('Profile updated but failed to re-fetch profile');
                console.error('Profile Refetch Error:', err);
            }

            toast.success('Profile updated successfully!', {
                autoClose: 2000,
            });

            setUser(updatedUser);
            setIsEditing(false);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
            console.error('Update Error:', error);
        } finally {
            setUpdating(false);
        }
    };

    // 🔁 IN handleDeleteProperty
    const handleDeleteProperty = async () => {
        setDeleting(true);
        try {
            await new propertyService().deletePropertyById(propertyToDelete);

            let propertiesResponse = [];
            try {
                propertiesResponse = await new propertyService().getPropertyByUserId();
            } catch (err) {
                toast.error('Deleted property but failed to refresh list');
                console.error('Refetch Properties Error:', err);
            }

            setProperties(propertiesResponse);
            toast.success('Property deleted successfully', {
                autoClose: 2000
            });
            setConfirmOpen(false);
        } catch (error) {
            toast.error('Failed to delete property');
            console.error('Delete Error:', error);
        } finally {
            setDeleting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="text-center my-5 py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    {/* Profile Card */}
                    <div className="card shadow mb-4">
                        <div className="card-body text-center p-4">
                            <div className="profile-avatar-wrapper mb-3">
                                <img
                                    src={user.avatar || '/default-avatar.png'}
                                    alt="Profile"
                                    className="profile-avatar"
                                />
                            </div>

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
                                    <button
                                        className="btn btn-success m-2"
                                        onClick={handleUpdateProfile}
                                        disabled={isUpdating}
                                    >
                                        {isUpdating ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Saving...
                                            </>
                                        ) : 'Save Changes'}
                                    </button>
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
                isProcessing={isDeleting}
            />
        </div>
    );
}