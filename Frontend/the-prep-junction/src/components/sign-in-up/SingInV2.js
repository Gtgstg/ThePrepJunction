import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Login.css';

function SignInV2() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://13.126.195.239:3600/api/sign/signin', {
                email,
                password,
            });
            console.log(response.data.userId);
            if(response.data.userId === "66363a70094b02b4fdaa2fab") {
                navigate('/main/');
            } else {
                navigate('/user/optcourse/' + response.data.userId);
            }
        } catch (error) {
            console.error(error.response.data);
            // Display error message
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <h2 className="login-title">Log In</h2>
            <label className="login-label">
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="login-input" />
            </label>
            <label className="login-label2">
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" />
            </label>
            <button type="submit" className="login-button">Log In</button>
            <div className="signup-option">
                <p>Don't have an account? <a href="/sign-up">Sign Up</a></p>
            </div>
        </form>
    );
}

export default SignInV2;