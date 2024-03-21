"use client"

import axios from 'axios';
const jwt = require('jsonwebtoken');
import { useEffect, useState } from "react"
import setAuthToken from "../utils/setAuthToken";

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');

    const client = axios.create({
        baseURL: "http://localhost:5000"
    });

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await client.post('/admin/login', { password });
            console.log('Response: ', response);
            // Directly access the token from response.data
            const { token } = response.data;
            if (token) {
                localStorage.setItem('adminToken', token); // Save the token
                setAuthToken(response.data.token);
                setIsAuthenticated(true);
            } else {
                // Handle case where response is successful but no token is returned
                alert('Login successful but no token received');
            }
        } catch (error) {
            console.log(`Error connecting to backend: ${error}`);
            // Handle HTTP error responses (status code outside 2xx)
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                alert(`Login failed: ${error.response.data.message || 'Unknown error'}`);
            } else if (error.request) {
                console.log(error.request);
                alert('No response from server');
            } else {
                alert('Error', error.message);
            }
        }
    };

    function getBookings() {
        client
            .get()
            .then((response) => {
                console.log(response);
            });
    }

    if (isAuthenticated) {
        return (
            <main>
                <p>Bookenator</p>
                <button onClick={() => getBookings()}>See Bookings</button>
            </main>
        )
    } else {
        return (
            <main>
                <form onSubmit={handleLogin}>
                    <div>Please enter your password to continue</div>
                    <input type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} className="text-black"></input>
                    <button type="submit">Continue</button>
                </form>
            </main>
        )
    }
}