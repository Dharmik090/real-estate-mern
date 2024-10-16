import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import userServices from '../services/userService';
import UserForm from './UserForm';


const UserRegister = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [firstnameError, setFirstnameError] = useState('');
    const [lastnameError, setLastnameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

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
        else {
            setPassword(value);
            setPasswordError(error);
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();


        console.log(-1);
        const user = {
            firstname,
            lastname,
            username,
            email,
            password,
        };

        new userServices().addUser(user).then((response) => {
            navigator("/login");
        }).catch((err) => {
            console.log(err.response.data.message);
        });

        setFirstname('');
        setLastname('');
        setUsername('');
        setEmail('');
        setPassword('');
    };

    const inputFields = (
        <>
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
                <label htmlFor="email" className="form-label" style={{ fontSize: '1.25rem' }}>Email</label>
                <input type="text" className="form-control form-control-lg" id="email" name="email"
                    placeholder="Enter Email" value={email} onChange={validateField}
                    onBlur={validateField} />
                <div className="text-danger small" style={{ fontSize: '1rem' }}>{emailError}</div>
            </div>

            <div className="mb-4">
                <label htmlFor="username" className="form-label" style={{ fontSize: '1.25rem' }}>Username</label>
                <input type="username" className="form-control form-control-lg" id="username" name="username"
                    placeholder="Enter Username" value={username} onChange={validateField}
                    onBlur={validateField} />
                <div className="text-danger small" style={{ fontSize: '1rem' }}>{usernameError}</div>
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
        <UserForm title="Register" inputFields={inputFields} handleSubmit={handleSubmit} />
    );
};

export default UserRegister;