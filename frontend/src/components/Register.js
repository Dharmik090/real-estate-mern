import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {
    // Defining state for each input field
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigator = useNavigate();

    // Function to handle form submission
    const handleSubmit =  (e) => {
      e.preventDefault();
  
      // Prepare form data
      const formData = {
          firstname,
          lastname,
          username,
          email,
          password,
      };
  
      try {
          // Make the POST request using axios
          const response =  axios.post('http://localhost:5000/user', formData);
          response.then((r) => {
            navigator("/Login");
            console.log(-2,r.data.message);
          }).catch((err)=>{
            console.log(-1,err.response.data.message);
          })
          // Handle the response (success message, etc.)
            console.log('Response from server:', response.data);
  
          // Clear the form if needed
          setFirstname('');
          setLastname('');
          setUsername('');
          setEmail('');
          setPassword('');
  
          // Optionally, show a success message or redirect
          // alert('Registration successful!');
      } catch (error) {
          // Handle error (e.g., validation issues, server errors)
          console.error('Error during registration:', error);
          alert('An error occurred. Please try again.');
      }
  };

    return (
        <div className="container" style={{ padding: "5rem 0rem" }}>
            <h2 className='text-center mt-5'>Register</h2>
            <div className='py-5 d-flex justify-content-center'>
                <div className="d-block mt-0 w-50">
                    <form onSubmit={handleSubmit}>
                        {/* Firstname */}
                        <div className="row mb-3">
                            <label htmlFor="firstname" className="col-md-3 control-label">First Name</label>
                            <div className="col-md-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter First Name"
                                    name="firstname"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Lastname */}
                        <div className="row mb-3">
                            <label htmlFor="lastname" className="col-md-3 control-label">Last Name</label>
                            <div className="col-md-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Last Name"
                                    name="lastname"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Username */}
                        <div className="row mb-3">
                            <label htmlFor="username" className="col-md-3 control-label">Username</label>
                            <div className="col-md-9">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Username"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="row mb-3">
                            <label htmlFor="email" className="col-md-3 control-label">Email</label>
                            <div className="col-md-9">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter Email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="row mb-3">
                            <label htmlFor="password" className="col-md-3 control-label">Password</label>
                            <div className="col-md-9">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter Password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="row mt-5 d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary w-25">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
