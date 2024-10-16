import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UseAuth } from './AuthContext';

const PropertyForm = () => {
    // Defining state for each input field
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [bhk, setBhk] = useState('');
    const [area, setArea] = useState('');
    const [status, setStatus] = useState('');
    const [location, setLocation] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [userid, setUserId] = useState(''); // Assuming you have a way to get the user ID
    const [images, setImages] = useState([]); // For storing multiple image URLs

    const navigator = useNavigate();
    const { userId } = UseAuth();
    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(userId);
        // Prepare form data
        const formData = {
            description,
            price: Number(price),
            bhk: Number(bhk),
            area: Number(area),
            status,
            location,
            city,
            state,
            country,
            latitude: Number(latitude),
            longitude: Number(longitude),
            images,
            userId
        };

        try {
            // Make the POST request using axios
            // const response =  axios.post('http://localhost:5000/user', formData);

            const response = axios.post('http://localhost:5000/property/670e6a4cccd6c48edcad3462', formData);
                response.then((r) => {
                    navigator("/addimages");
                    console.log(-2,r.data.message);
                }).catch((err)=>{
                    console.log(-1,err.response.data.message);
                })
    
        } catch (error) {
            console.error('Error during property submission:', error);
            alert('An error occurred. Please try again.');
        }

        // Clear the form if needed
        setDescription('');
        setPrice('');
        setBhk('');
        setArea('');
        setStatus('');
        setLocation('');
        setCity('');
        setState('');
        setCountry('');
        setLatitude('');
        setLongitude('');
        setImages([]);
    };

    return (
        <div className="container" style={{ padding: "5rem 0rem" }}>
            <h2 className='text-center mt-5'>Add Property</h2>
            <div className='py-5 d-flex justify-content-center'>
                <div className="d-block mt-0 w-50">
                    <form onSubmit={handleSubmit}>
                        {/* Description */}
                        <div className="row mb-3">
                            <label htmlFor="description" className="col-md-3 control-label">Description</label>
                            <div className="col-md-9">
                                <textarea
                                    className="form-control"
                                    placeholder="Enter Description"
                                    name="description"
                                    value={description}
                                    // value="dddd"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Price */}
                        <div className="row mb-3">
                            <label htmlFor="price" className="col-md-3 control-label">Price</label>
                            <div className="col-md-9">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter Price"
                                    name="price"
                                    value={price}
                                    // value="1200"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* BHK */}
                        <div className="row mb-3">
                            <label htmlFor="bhk" className="col-md-3 control-label">BHK</label>
                            <div className="col-md-9">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter BHK"
                                    name="bhk"
                                    value={bhk}
                                    // value="3"
                                    onChange={(e) => setBhk(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Area */}
                        <div className="row mb-3">
                            <label htmlFor="area" className="col-md-3 control-label">Area (sq ft)</label>
                            <div className="col-md-9">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter Area"
                                    name="area"
                                    value={area}
                                    // value="1500"
                                    onChange={(e) => setArea(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Status */}
                        <div className="row mb-3">
                            <label htmlFor="status" className="col-md-3 control-label">Status</label>
                            <div className="col-md-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Status (e.g. Available)"
                                    name="status"
                                    value={status}
                                    // value="rent"
                                    onChange={(e) => setStatus(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div className="row mb-3">
                            <label htmlFor="location" className="col-md-3 control-label">Location</label>
                            <div className="col-md-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Location"
                                    name="location"
                                    value={location}
                                    // value="near template link"
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* City */}
                        <div className="row mb-3">
                            <label htmlFor="city" className="col-md-3 control-label">City</label>
                            <div className="col-md-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter City"
                                    name="city"
                                    value={city}
                                    // value="morbi"
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* State */}
                        <div className="row mb-3">
                            <label htmlFor="state" className="col-md-3 control-label">State</label>
                            <div className="col-md-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter State"
                                    name="state"
                                    value={state}
                                    // value="karachi"
                                    onChange={(e) => setState(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Country */}
                        <div className="row mb-3">
                            <label htmlFor="country" className="col-md-3 control-label">Country</label>
                            <div className="col-md-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Country"
                                    name="country"
                                    value={country}
                                    // value="USA"
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Latitude */}
                        <div className="row mb-3">
                            <label htmlFor="latitude" className="col-md-3 control-label">Latitude</label>
                            <div className="col-md-9">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter Latitude"
                                    name="latitude"
                                    value={latitude}
                                    // value="20"
                                    onChange={(e) => setLatitude(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Longitude */}
                        <div className="row mb-3">
                            <label htmlFor="longitude" className="col-md-3 control-label">Longitude</label>
                            <div className="col-md-9">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter Longitude"
                                    name="longitude"
                                    value={longitude}
                                    // value="30"
                                    onChange={(e) => setLongitude(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="row mt-5 d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary w-25">Add Property</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PropertyForm;
