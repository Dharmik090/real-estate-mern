// import { useEffect, useState } from "react";
// import userServices from "../services/userService";

// export default function Profile() {
//     const [user, setUser] = useState({});

//     useEffect(() => {
//         const userId = localStorage.getItem('userId');
//         new userServices().getUserById(userId)
//             .then((response) => {
//                 setUser(response.data);
//             }).catch((err) => {
//                 console.log(err);
//             });
//     }, []);

//     return (
//         <>
//             <div className="mt-5 mb-5 row justify-content-center">
//                 <div className="col-md-6">
//                     <div className="card text-center shadow">
//                         <div className="card-body">
//                             <img
//                                 src={user.avatar}
//                                 alt="Avatar"
//                                 className="rounded-circle mt-3"
//                                 style={{ width: "150px", height: "150px" }}
//                             />
//                             <h3 className="card-title mt-3">{user.username}</h3>
//                             <p className="card-text">{user.email}</p>
//                             <p><strong>Location:</strong> {user.location}</p>
//                             <div>
//                                 <strong>Skills:</strong>
//                                 <ul className="list-inline">
//                                     {user.skills.map((skill, index) => (
//                                         <li className="list-inline-item" key={index}>
//                                             <button className="btn btn-outline-primary btn-sm mx-1">
//                                                 {skill}
//                                             </button>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                             <button className="btn btn-primary mt-2">Add Property</button>
//                             <button className="btn btn-outline-secondary mt-2 ml-2">View Properties</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }


import { useEffect, useState } from "react";
import userServices from "../services/userService";
import propertyService from "../services/propertyService";

export default function Profile() {
    const [user, setUser] = useState({});
    const [properties, setProperties] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(async () => {
        const userId = localStorage.getItem('userId');
        
        const userResponse = await new userServices().getUserById(userId);
        setUser(userResponse.data);

        const propertiesResponse = await new propertyService().getPropertyByUserId(userId);
        setProperties(propertiesResponse.data);
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
        setFormData({
            username: user.username,
            email: user.email,
            location: user.location,
            skills: user.skills,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdateProfile = async () => {
        try {
            const userId = localStorage.getItem('userId');
            await new userServices().updateUser(userId, formData); // Assume this function exists
            // fetchUserData(userId); // Refresh the user data
            setIsEditing(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteProperty = async (propertyId) => {
        try {
            await new userServices().deleteProperty(propertyId); // Assume this function exists
            setProperties(properties.filter(prop => prop._id !== propertyId));
        } catch (err) {
            console.log(err);
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
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className="form-control mt-2"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="form-control mt-2"
                                    />
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className="form-control mt-2"
                                    />
                                    <button className="btn btn-success mt-2" onClick={handleUpdateProfile}>Save Changes</button>
                                    <button className="btn btn-secondary mt-2" onClick={() => setIsEditing(false)}>Cancel</button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="card-title mt-3">{user.username}</h3>
                                    <p className="card-text">{user.email}</p>
                                    <p><strong>Location:</strong> {user.location}</p>
                                    <div>
                                        <strong>Skills:</strong>
                                        {/* <ul className="list-inline">
                                            {user.skills.map((skill, index) => (
                                                <li className="list-inline-item" key={index}>
                                                    <button className="btn btn-outline-primary btn-sm mx-1">
                                                        {skill}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul> */}
                                    </div>
                                    <button className="btn btn-primary mt-2" onClick={handleEditClick}>Edit Profile</button>
                                </>
                            )}
                        </div>
                    </div>
                    <h4 className="mt-4">My Properties</h4>
                    <div className="list-group">
                        {properties.length > 0 ? properties.map((property) => (
                            <div className="list-group-item" key={property._id}>
                                <h5>{property.title}</h5>
                                <p>{property.description}</p>
                                <button className="btn btn-danger" onClick={() => handleDeleteProperty(property._id)}>Delete</button>
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
