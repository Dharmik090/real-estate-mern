import { useEffect, useState } from "react";
import userServices from "../services/userService";
import propertyService from "../services/propertyService";
import { useNavigate } from "react-router-dom";

export default function Profile() {

    const navigator = useNavigate();

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState(null);

    const [firstnameError, setFirstnameError] = useState('');
    const [lastnameError, setLastnameError] = useState('');
    const [usernameError, setUsernameError] = useState('');

    const [user, setUser] = useState({});
    const [properties, setProperties] = useState([]);
    const [isEditing, setIsEditing] = useState(false);


    const fetchData = async () => {
        const userId = localStorage.getItem('userId');

        const userResponse = await new userServices().getUserById(userId);
        setUser(userResponse.data);

        const propertiesResponse = await new propertyService().getPropertyByUserId(userId);
        setProperties(propertiesResponse.data);
    }

    useEffect(() => {
        fetchData();

        setFirstname(user.firstname);
        setLastname(user.lastname);
        setUsername(user.username);
        setAvatar(user.avatar);
    }, [isEditing]);

    const handleEditClick = () => {
        setIsEditing(true);
    };


    const validateField = (e) => {
        const field = e.target.name;
        const value = e.target.value;

        let error = '';
        if (value === '') {
            error = `${field.charAt(0).toUpperCase() + field.substr(1)} is Required`;
        }

        if (field === 'firstname') {
            setFirstname(value);
            setFirstnameError(error);
        }
        else if (field === 'lastname') {
            setLastname(value);
            setLastnameError(error);
        }
        else if (field === 'username') {
            setUsername(value);
            setUsernameError(error);
        }
        else {
            setAvatar(e.target.files[0]);
        }

    }


    const handleUpdateProfile = async () => {
        try {
            const userId = localStorage.getItem('userId');

            const formData = new FormData();
            formData.append('firstname', firstname);
            formData.append('lastname', lastname);
            formData.append('username', username);
            formData.append('avatar', avatar);

            await new userServices().updateUser(userId, formData);
            setIsEditing(false);
        } catch (err) {
            console.log(err.response.data.message);
        }
    };

    const handleDeleteProperty = async (propertyId) => {
        try {
            const response = await new propertyService().deletePropertyById(propertyId);
            await fetchData();
        } catch (err) {
            console.log(err.response.data.message);
        }
    };

    return (
        <>
            <div className="mt-5 mb-5 row justify-content-center">
                <div className="col-md-6">
                    <div className="card text-center shadow">
                        <div className="card-body">
                            <img
                                src={user.avatar}
                                alt="Avatar"
                                className="rounded-circle mt-3"
                                style={{ width: "150px", height: "150px" }}
                            />
                            {isEditing ? (
                                <div>
                                    <div className="mb-4">
                                        <label htmlFor="firstname" className="form-label" style={{ fontSize: '1.25rem' }}>First Name</label>
                                        <input type="text" className="form-control form-control-lg" id="firstname" name="firstname"
                                            placeholder="Enter First Name" value={firstname} onChange={validateField}
                                            onBlur={validateField} />
                                        <div className="text-danger small" style={{ fontSize: '1rem' }}>{firstnameError}</div>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="lastname" className="form-label" style={{ fontSize: '1.25rem' }}>Last Name</label>
                                        <input type="text" className="form-control form-control-lg" id="lastname" name="lastname"
                                            placeholder="Enter Last Name" value={lastname} onChange={validateField}
                                            onBlur={validateField} />
                                        <div className="text-danger small" style={{ fontSize: '1rem' }}>{lastnameError}</div>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="username" className="form-label" style={{ fontSize: '1.25rem' }}>Username</label>
                                        <input type="username" className="form-control form-control-lg" id="username" name="username"
                                            placeholder="Enter Username" value={username} onChange={validateField}
                                            onBlur={validateField} />
                                        <div className="text-danger small" style={{ fontSize: '1rem' }}>{usernameError}</div>
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="password" className="form-label" style={{ fontSize: '1.25rem' }}>Profile Picture</label>
                                        <input type="file" className="form-control form-control-lg" id="avatar" name="avatar"
                                            onChange={validateField} onBlur={validateField} />
                                    </div>
                                    <button className="btn btn-success m-2" onClick={handleUpdateProfile}>Save Changes</button>
                                    <button className="btn btn-secondary m-2" onClick={() => setIsEditing(false)}>Cancel</button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="card-title mt-3">{user.username}</h3>
                                    <p className="card-text">{user.email}</p>
                                    <button className="btn btn-primary m-2" onClick={handleEditClick}>Edit Profile</button>
                                    <button className="btn btn-primary m-2" onClick={() => { navigator('/property/add') }}>Add Property</button>
                                </>
                            )}
                        </div>
                    </div>
                    <h4 className="mt-4 mb-4">My Properties</h4>
                    <div className="list-group">
                        {properties.length > 0 ? properties.map((property) => (
                            <div className="list-group-item m-1" key={property._id}>
                                <h5>{property.title}</h5>
                                <button className="btn btn-success m-1 mt-3" onClick={() => {
                                    setIsEditing(isEditing);
                                    navigator('/flat/' + property._id)
                                }}>View</button>
                                <button className="btn btn-primary m-1 mt-3" onClick={() => navigator('/property/edit/' + property._id)}>Edit</button>
                                <button className="btn btn-danger m-1 mt-3" onClick={() => handleDeleteProperty(property._id)}>Delete</button>
                            </div>
                        )) : (
                            <p>No properties found.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
