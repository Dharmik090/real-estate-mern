import React, { Component, useEffect, useState } from "react";
import propertyService from "../services/propertyService";
import { useParams } from "react-router-dom";
import userServices from "../services/userService";
import UserForm from "./User/UserForm";
import axios from "axios";

export default function MailSender(props) {

    const { pid } = useParams();

    const [property, setProperty] = useState([]);
    const [userId, setUserId] = useState([]);
    const [from, setFromEmail] = useState([]);
    const [to, setToEmail] = useState([]);


    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [messageError, setMessageError] = useState('');

    const validateField = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        let error = '';
        if (value === '') {
            error = `${field.charAt(0).toUpperCase() + field.substr(1)} is Required`;
        }

        if (field === 'email') {
            setMessage(value);
            setMessageError(error);
        }
    };

    
    const fetchData = async () => {
        const response = await new propertyService().getPropertyById(pid);

        response.data.images = response.data.images.map(image => {
            return ({
                original: image
            });
        });

        setUserId(response.data.userid);
        setProperty(response.data);
    };


    const fetchData2 = async () => {
        const response = await new userServices().getUserById(userId);

        setToEmail(response.data.email);
    };

    const fetchData3 = async () => {
        const response = await new userServices().getUserById(localStorage.getItem('userId'));
        
        setFromEmail(response.data.email);
    };

    const handleSubmit = async() => {
        const data = {
            from,
            to,
            message,
            password
        }

        // await axios.post('http://localhost:5000/send-email', data);

    }

    useEffect(() => {
        fetchData();
        console.log(-1,userId)
        fetchData2();
        fetchData3();
    }, []);

    const inputFields = (
        <>
            <div className="mb-4">
                <label htmlFor="email" className="form-label" style={{ fontSize: '1.25rem' }}>Message</label>
                <textarea className="form-control form-control-lg" id="message" name="message"
                    placeholder="Enter Message" value={message} onChange={validateField}
                    onBlur={validateField} />
                <div className="text-danger small" style={{ fontSize: '1rem' }}>{messageError}</div>
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="form-label" style={{ fontSize: '1.25rem' }}>Your Email Password</label>
                <input type="text" className="form-control form-control-lg" id="message" name="message"
                    placeholder="Enter Password" value={message} onChange={(e) => setPassword(e.target.value)} />
            </div>
        </>
    );


    return (
        <UserForm title="Send EMail" inputFields={inputFields} handleSubmit={handleSubmit} />
    );
}
