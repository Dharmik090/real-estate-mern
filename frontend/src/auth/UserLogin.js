import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "./UserForm";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../components/AuthContext";

export default function UserLogin() {
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

        const success = await login({ email, password });
        if (success) {
            toast.success('Login successful! Redirecting...', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => navigate('/'), 2000);
        } else {
            toast.error('Login failed. Please check your credentials.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
            <UserForm title="Login" inputFields={inputFields} handleSubmit={handleSubmit} />
        </>
    );
}