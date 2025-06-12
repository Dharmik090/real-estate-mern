import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import userServices from '../services/userService';
import UserForm from './UserForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserRegister = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(null);

    const [firstnameError, setFirstnameError] = useState('');
    const [lastnameError, setLastnameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [isProcessing, setIsProcessing] = useState(false);
    const navigator = useNavigate();

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
        else if (field === 'email') {
            setEmail(value);
            setEmailError(error);
        }
        else if (field === 'username') {
            setUsername(value);
            setUsernameError(error);
        }
        else if (field === 'password') {
            setPassword(value);
            setPasswordError(error);
        }
        else {
            setAvatar(e.target.files[0]);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!firstname || !lastname || !email || !username || !password) {
            return;
        }

        setIsProcessing(true);
        const userData = new FormData();
        userData.append('firstname', firstname);
        userData.append('lastname', lastname);
        userData.append('email', email);
        userData.append('username', username);
        userData.append('password', password);
        if (avatar instanceof File) {
            userData.append('avatar', avatar);
        }

        try {
            const response = await new userServices().addUser(userData);

            if (response.status === 201) {
                toast.success('Account created successfully! Redirecting to login...', {
                    autoClose: 2000,
                });

                setFirstname('');
                setLastname('');
                setUsername('');
                setEmail('');
                setPassword('');
                setAvatar(null);

                setTimeout(() => navigator("/login"), 2000);
            } else {
                toast.warning('Registration completed, but with unexpected response', {
                    autoClose: 2000,
                });
            }
        }
        catch (err) {
            setPassword('');

            if (err.response) {
                const message = err.response.data.message;
                const status = err.response.status;

                if (message === 'Email already exist') {
                    setEmailError(message);
                    toast.error('Email already exists. Please use a different email.', {
                        autoClose: 2000,
                    });
                }
                else if (message === 'Username already exist') {
                    setUsernameError(message);
                    toast.error('Username already exists. Please choose a different username.', {
                        autoClose: 2000
                    });
                }
                else {
                    toast.error('Registration failed. Please try again.', {
                        autoClose: 2000
                    });
                }
            } else if (err.request) {
                toast.error('Network error: Please check your connection', {
                    autoClose: 2000
                });
            } else {
                toast.error('An unexpected error occurred', {
                    autoClose: 2000
                });
            }
        } finally {
            setIsProcessing(false);
        }
    };

    const inputFields = (
        <>
            <div style={{ marginBottom: '0.5rem !important' }}>
                <label htmlFor="firstname" className="form-label" style={{ fontSize: '1.25rem' }}>First Name</label>
                <input type="text" className="form-control form-control-lg" id="firstname" name="firstname"
                    placeholder="Enter First Name" value={firstname} onChange={validateField}
                    onBlur={validateField} required />
                <div className="text-danger small" style={{ fontSize: '1rem', margin: "0.5rem auto" }}>{firstnameError}</div>
            </div>

            <div style={{ marginBottom: '0.5rem !important' }}>
                <label htmlFor="lastname" className="form-label" style={{ fontSize: '1.25rem' }}>Last Name</label>
                <input type="text" className="form-control form-control-lg" id="lastname" name="lastname"
                    placeholder="Enter Last Name" value={lastname} onChange={validateField}
                    onBlur={validateField} required />
                <div className="text-danger small" style={{ fontSize: '1rem', margin: "0.5rem auto" }}>{lastnameError}</div>
            </div>

            <div style={{ marginBottom: '0.5rem !important' }}>
                <label htmlFor="email" className="form-label" style={{ fontSize: '1.25rem' }}>Email</label>
                <input type="email" className="form-control form-control-lg" id="email" name="email"
                    placeholder="Enter Email" value={email} onChange={validateField}
                    onBlur={validateField} required />
                <div className="text-danger small" style={{ fontSize: '1rem', margin: "0.5rem auto" }}>{emailError}</div>
            </div>

            <div style={{ marginBottom: '0.5rem !important' }}>
                <label htmlFor="username" className="form-label" style={{ fontSize: '1.25rem' }}>Username</label>
                <input type="text" className="form-control form-control-lg" id="username" name="username"
                    placeholder="Enter Username" value={username} onChange={validateField}
                    onBlur={validateField} required />
                <div className="text-danger small" style={{ fontSize: '1rem', margin: "0.5rem auto" }}>{usernameError}</div>
            </div>

            <div style={{ marginBottom: '0.5rem !important' }}>
                <label htmlFor="password" className="form-label" style={{ fontSize: '1.25rem' }}>Password</label>
                <input type="password" className="form-control form-control-lg" id="password" name="password"
                    placeholder="Enter Password" value={password} onChange={validateField}
                    onBlur={validateField} required />
                <div className="text-danger small" style={{ fontSize: '1rem', margin: "0.5rem auto" }}>{passwordError}</div>
            </div>

            <div style={{ marginBottom: '0.5rem !important' }}>
                <label htmlFor="avatar" className="form-label" style={{ fontSize: '1.25rem' }}>Profile Picture</label>
                <input type="file" className="form-control form-control-lg" id="avatar" name="avatar"
                    onChange={validateField} onBlur={validateField} />
            </div>
        </>
    );

    return (
        <>
            <UserForm title="Register" inputFields={inputFields} handleSubmit={handleSubmit} isProcessing={isProcessing} setIsProcessing={setIsProcessing} />
        </>
    );
};

export default UserRegister;