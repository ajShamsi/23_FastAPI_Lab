import React, { useState } from 'react';
import axios from 'axios';

const UserRegistration = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phoneNumber: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/register/', formData);
            console.log(response.data);
        } catch (error) {
            setErrorMessage(error.response.data.detail);
        }
    };

    return (
        <div>
            <h2>User Registration</h2>
            {errorMessage && <p>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input type="tel" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default UserRegistration;
