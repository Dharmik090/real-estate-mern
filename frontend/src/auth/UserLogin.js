import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "./UserForm";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "./AuthContext";

export default function UserLogin() {
    const [isProcessing, setIsProcessing] = useState(false); // Add this line

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const validateField = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        let error = '';
        if (value === '') {
            error = `${field.charAt(0).toUpperCase() + field.substr(1)} is Required`;
        }

        if (field === 'email') {
            setEmail(value);
            setEmailError(error);
        } else {
            setPassword(value);
            setPasswordError(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setEmailError('');
        setPasswordError('');

        let isValid = true;
        if (!email) {
            setEmailError('Email is Required');
            isValid = false;
        }
        if (!password) {
            setPasswordError('Password is Required');
            isValid = false;
        }
        if (!isValid) return;

        setIsProcessing(true);
        const response = await login({ email, password });

        if (response.success) {
            toast.success('Login successful! Redirecting...', {
                autoClose: 2000,
            });

            setIsProcessing(false);
            setTimeout(() => navigate('/'), 2000);
        } else {
            if (response.message === 'Email does not exist')
                setEmailError(response.message);
            else if (response.message === 'Incorrect Password')
                setPasswordError(response.message);

            setIsProcessing(false);
        }
    };

    const inputFields = (
        <>
            <div style={{ marginBottom: '0.5rem !important' }}>
                <label htmlFor="email" className="form-label" style={{ fontSize: '1.25rem' }}>Email</label>
                <input type="text" className="form-control form-control-lg" id="email" name="email"
                    placeholder="Enter Email" value={email} onChange={validateField}
                    onBlur={validateField} />
                <div className="text-danger small" style={{ fontSize: '1rem', margin: "0.5rem auto" }}>{emailError}</div>
            </div>

            <div style={{ marginBottom: '0.5rem !important' }}>
                <label htmlFor="password" className="form-label" style={{ fontSize: '1.25rem' }}>Password</label>
                <input type="password" className="form-control form-control-lg" id="password" name="password"
                    placeholder="Enter Password" value={password} onChange={validateField}
                    onBlur={validateField} />
                <div className="text-danger small" style={{ fontSize: '1rem', margin: "0.5rem auto" }}>{passwordError}</div>
            </div>
        </>
    );

    return (
        <>
            <UserForm
                title="Login"
                inputFields={inputFields}
                handleSubmit={handleSubmit}
                isProcessing={isProcessing} 
                setIsProcessing={setIsProcessing}
            />
        </>
    );
}