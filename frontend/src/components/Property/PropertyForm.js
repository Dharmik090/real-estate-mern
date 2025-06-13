// Property form

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import propertyService from '../../services/propertyService';
import MapComponent from '../ui/MapComponent';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../static/PropertyForm.css'

const PropertyForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [property, setProperty] = useState({
        title: '',
        description: '',
        price: '',
        bhk: '',
        area: '',
        status: '',
        location: '',
        city: '',
        state: '',
        country: '',
        latitude: '',
        longitude: '',
        images: []
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const fetchProperty = async () => {
        try {
            const response = await new propertyService().getPropertyById(id);
            setProperty(response);
        } catch (error) {
            toast.error('Failed to fetch property data');
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchProperty();
        }
    }, [id]);

    const validateForm = () => {
        const newErrors = {};
        if (!property.title.trim()) newErrors.title = 'Title is required';
        if (!property.description.trim()) newErrors.description = 'Description is required';
        if (!property.price) newErrors.price = 'Price is required';
        if (!property.bhk) newErrors.bhk = 'BHK is required';
        if (!property.area) newErrors.area = 'Area is required';
        if (!property.location.trim()) newErrors.location = 'Location is required';
        if (!property.city.trim()) newErrors.city = 'City is required';
        if (!property.state.trim()) newErrors.state = 'State is required';
        if (!property.country.trim()) newErrors.country = 'Country is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const propertyData = {
                title: property.title,
                description: property.description,
                price: Number(property.price),
                bhk: Number(property.bhk),
                area: Number(property.area),
                status: property.status,
                location: property.location,
                city: property.city,
                state: property.state,
                country: property.country,
                latitude: Number(property.latitude),
                longitude: Number(property.longitude),
                images: property.images
            };

            const propertyForm = new FormData();
            for (const key in propertyData) {
                if (key !== 'images') {
                    propertyForm.append(key, propertyData[key]);
                }
            }

            if (propertyData.images && Array.isArray(propertyData.images)) {
                propertyData.images.forEach((image, index) => {
                    if (image instanceof File) {
                        propertyForm.append('images', image);
                    }
                });
            }

            if (id) {
                await new propertyService().updateProperty(id, propertyForm);
                toast.success('Property updated successfully!', {
                    autoClose: 2000,
                });
            } else {
                await new propertyService().addProperty(propertyForm);
                toast.success('Property added successfully!', {
                    autoClose: 2000,
                });
            }

            navigate('/profile');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed', {
                autoClose: 2000,
            });
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProperty(prev => ({ ...prev, [name]: value }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setProperty(prev => ({ ...prev, images: files }));
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-body p-4">
                            <button
                                onClick={() => navigate('/profile')}
                                className="back-btn"
                            >
                                ← Back to Profile
                            </button>

                            <h2 className="text-center mt-4 mb-4">{id ? 'Edit Property' : 'Add New Property'}</h2>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                        name="title"
                                        value={property.title}
                                        onChange={handleInputChange}
                                    />
                                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                        name="description"
                                        value={property.description}
                                        onChange={handleInputChange}
                                        rows="3"
                                    />
                                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Price ($)</label>
                                        <input
                                            type="number"
                                            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                            name="price"
                                            value={property.price}
                                            onChange={handleInputChange}
                                        />
                                        {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                                    </div>
                                    {/* <div className="col-md-6 mb-3">
                                        <label className="form-label">BHK</label>
                                        <input
                                            type="number"
                                            className={`form-control ${errors.bhk ? 'is-invalid' : ''}`}
                                            name="bhk"
                                            value={property.bhk}
                                            onChange={handleInputChange}
                                        />
                                        {errors.bhk && <div className="invalid-feedback">{errors.bhk}</div>}
                                    </div> */}
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">BHK</label>
                                        <select
                                            className="form-control"
                                            name="bhk"
                                            value={property.bhk}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select BHK</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5+">5+</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Area (sq ft)</label>
                                        <input
                                            type="number"
                                            className={`form-control ${errors.area ? 'is-invalid' : ''}`}
                                            name="area"
                                            value={property.area}
                                            onChange={handleInputChange}
                                        />
                                        {errors.area && <div className="invalid-feedback">{errors.area}</div>}
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Status</label>
                                        <select
                                            className="form-control"
                                            name="status"
                                            value={property.status}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select Status</option>
                                            <option value="For Rent">For Rent</option>
                                            <option value="For Sell">For Sell</option>
                                            <option value="Sold">Sold</option>
                                            <option value="Rented">Rented</option>
                                            <option value="Not Available">Not Available</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Location</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                                        name="location"
                                        value={property.location}
                                        onChange={handleInputChange}
                                    />
                                    {errors.location && <div className="invalid-feedback">{errors.location}</div>}
                                </div>

                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">City</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                                            name="city"
                                            value={property.city}
                                            onChange={handleInputChange}
                                        />
                                        {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">State</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                                            name="state"
                                            value={property.state}
                                            onChange={handleInputChange}
                                        />
                                        {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label">Country</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                                            name="country"
                                            value={property.country}
                                            onChange={handleInputChange}
                                        />
                                        {errors.country && <div className="invalid-feedback">{errors.country}</div>}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Latitude</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="latitude"
                                            value={property.latitude}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Longitude</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="longitude"
                                            value={property.longitude}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <MapComponent
                                    setProperty={setProperty}
                                    latitude={property.latitude}
                                    longitude={property.longitude}
                                />

                                <div className="mb-4 mt-4">
                                    <label className="form-label">Property Images (max. 10 images)</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        multiple
                                        onChange={handleFileChange}
                                    />
                                </div>

                                <div className="d-flex justify-content-center gap-3 mt-4">
                                    <button
                                        type="submit"
                                        className="btn btn-primary px-4"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Processing...' : (id ? 'Update Property' : 'Add Property')}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary px-4"
                                        onClick={() => navigate('/profile')}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyForm;