import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Signup.css';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send the display name (name), email, and password in the signup request
            const response = await axios.post('http://15.207.223.154:3600/api/sign/signup', {
                name,
                email,
                password,
            });
            console.log(response.data);
            // Navigate to the sign-in page upon successful signup
            navigate('/sign-in');
        } catch (error) {
            console.error(error.response ? error.response.data : error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="signup-form">
            <h2 className="signup-title">Sign Up</h2>
            <label className="signup-label">
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="signup-input"
                    required
                />
            </label>
            <label className="signup-label">
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="signup-input"
                    required
                />
            </label>
            <label className="signup-label2">
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="signup-input"
                    required
                />
            </label>
            <button type="submit" className="signup-button">Sign Up</button>
            <div className="signup-option">
                <p>Already have an account? <a href="/sign-in">Log In</a></p>
            </div>
        </form>
    );
}

export default Signup;
