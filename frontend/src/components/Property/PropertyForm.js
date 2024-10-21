import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import propertyService from '../../services/propertyService';
import MapComponent from '../MapComponent';


const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    reject(error);
                }
            );
        } else {
            reject(new Error("Geolocation is not supported by this browser."));
        }
    });
};


const PropertyForm = () => {

    const { id } = useParams();

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
        images: null
    });

    const fetchData = async () => {
        const response = await new propertyService().getPropertyById(id);

        const data = response.data;
        data.images = data.images.map(image => {

            return ({
                original: image,
            });
        });
        setProperty(response.data);
    };

    useEffect(() => {

        if (id) {
            fetchData();
        }
    }, []);


    const navigator = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', property.title);
        formData.append('description', property.description);
        formData.append('price', Number(property.price));
        formData.append('bhk', Number(property.bhk));
        formData.append('area', Number(property.area));
        formData.append('status', property.status);
        formData.append('location', property.location);
        formData.append('city', property.city);
        formData.append('state', property.state);
        formData.append('country', property.country);
        formData.append('latitude', Number(property.latitude));
        formData.append('longitude', Number(property.longitude));
        property.images.forEach((image, index) => {
            formData.append('images', image);
        });


        try {
            const userId = localStorage.getItem('userId');

            if (id) {
                const response = await new propertyService().updateProperty(id, formData);
            }
            else {
                const response = await new propertyService().addProperty(userId, formData);
            }
            navigator('/profile');
        } catch (err) {
            console.log(err.response.data.message);
        }
    };


    return (
        <div className="mb-5 mt-5 container-fluid d-flex justify-content-center align-items-center bg-light">
            <div className="card p-5 shadow-sm" style={{ maxWidth: '700px', width: '100%' }}>
                <h3 className="text-center mb-4" style={{ fontSize: '2rem' }}>{id ? 'Edit ' : 'Add'} Property</h3>

                <form onSubmit={handleSubmit}>

                    <div className="row mb-3">
                        <label htmlFor="title" className="col-md-3 control-label">Title</label>
                        <div className="col-md-9">
                            <textarea
                                className="form-control"
                                placeholder="Enter Title"
                                name="title"
                                value={property.title}
                                onChange={(e) => setProperty({ ...property, [e.target.name]: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="description" className="col-md-3 control-label">Description</label>
                        <div className="col-md-9">
                            <textarea
                                className="form-control"
                                placeholder="Enter Description"
                                name="description"
                                value={property.description}
                                onChange={(e) => setProperty({ ...property, [e.target.name]: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="price" className="col-md-3 control-label">Price</label>
                        <div className="col-md-9">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Price"
                                name="price"
                                value={property.price}
                                onChange={(e) => setProperty({ ...property, [e.target.name]: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="bhk" className="col-md-3 control-label">BHK</label>
                        <div className="col-md-9">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter BHK"
                                name="bhk"
                                value={property.bhk}
                                onChange={(e) => setProperty({ ...property, [e.target.name]: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="area" className="col-md-3 control-label">Area (sq ft)</label>
                        <div className="col-md-9">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Area"
                                name="area"
                                value={property.area}
                                onChange={(e) => setProperty({ ...property, [e.target.name]: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="status" className="col-md-3 control-label">Status</label>
                        <div className="col-md-9">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Status (e.g. Available)"
                                name="status"
                                value={property.status}
                                onChange={(e) => setProperty({ ...property, [e.target.name]: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="location" className="col-md-3 control-label">Location</label>
                        <div className="col-md-9">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Location"
                                name="location"
                                value={property.location}
                                onChange={(e) => setProperty({ ...property, [e.target.name]: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="city" className="col-md-3 control-label">City</label>
                        <div className="col-md-9">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter City"
                                name="city"
                                value={property.city}
                                onChange={(e) => setProperty({ ...property, [e.target.name]: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="state" className="col-md-3 control-label">State</label>
                        <div className="col-md-9">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter State"
                                name="state"
                                value={property.state}
                                onChange={(e) => setProperty({ ...property, [e.target.name]: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="country" className="col-md-3 control-label">Country</label>
                        <div className="col-md-9">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Country"
                                name="country"
                                value={property.country}
                                onChange={(e) => setProperty({ ...property, [e.target.name]: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="latitude" className="col-md-3 control-label">Latitude</label>
                        <div className="col-md-9">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Latitude"
                                name="latitude"
                                value={property.latitude}
                                onChange={(e) => setProperty({ ...property, [e.target.name]: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="longitude" className="col-md-3 control-label">Longitude</label>
                        <div className="col-md-9">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Longitude"
                                name="longitude"
                                value={property.longitude}
                                onChange={(e) => setProperty({ ...property, [e.target.name]: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="images" className="form-label">Properties Picture</label>
                        <input type="file" className="form-control" id="images" name="images"
                            onChange={(e) => {
                                const files = Array.from(e.target.files);
                                setProperty({ ...property, [e.target.name]: files });
                            }} multiple />
                    </div>

                    <MapComponent setProperty={setProperty} latitude={property.latitude} longitude={property.longitude}/>

                    <div className="row mt-5 d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary w-25 m-2">{(id) ? 'Edit' : 'Add'} Property</button>
                        <button className="btn btn-secondary w-25 m-2" onClick={() => navigator('/profile')}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PropertyForm;
