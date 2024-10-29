import React, { useState } from "react";
import userService from "../../services/userService";
import { useNavigate } from "react-router-dom";
import UserForm from "./UserForm";
import Alert from "../Alert"; 

export default function UserLogin(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [alert, setAlert] = useState({ message: '', type: '', isVisible: false });

    const navigator = useNavigate();

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { email, password };

        new userService().userLogIn(user).then((response) => {
            props.setIsLoggedIn(true);
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            showAlert('Login successful!', 'success');
            navigator('/');
        }).catch((error) => {
            const status = error.response.status;
            const message = error.response.data.message;
            if (status === 404) {
                setEmailError(message);
                setPasswordError('');
            } else if (status === 400) {
                setPasswordError(message);
                setEmailError('');
            } else {
                navigator('/error');
            }
            showAlert('Error logging in.', 'error');
        });
    };

    const showAlert = (message, type) => {
        setAlert({ message, type, isVisible: true });
    };

    const handleCloseAlert = () => {
        setAlert({ ...alert, isVisible: false });
    };

    const inputFields = (
        <>
            <div className="mb-4">
                <label htmlFor="email" className="form-label" style={{ fontSize: '1.25rem' }}>Email</label>
                <input type="text" className="form-control form-control-lg" id="email" name="email"
                    placeholder="Enter Email" value={email} onChange={validateField}
                    onBlur={validateField} />
                <div className="text-danger small" style={{ fontSize: '1rem' }}>{emailError}</div>
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="form-label" style={{ fontSize: '1.25rem' }}>Password</label>
                <input type="password" className="form-control form-control-lg" id="password" name="password"
                    placeholder="Enter Password" value={password} onChange={validateField}
                    onBlur={validateField} />
                <div className="text-danger small" style={{ fontSize: '1rem' }}>{passwordError}</div>
            </div>
        </>
    );

    return (
        <>
            <UserForm title="Login" inputFields={inputFields} handleSubmit={handleSubmit} />
            {alert.isVisible && (
                <Alert 
                    message={alert.message} 
                    type={alert.type} 
                    onClose={handleCloseAlert} 
                />
            )}
        </>
    );
}
