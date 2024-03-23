"use client"

import axios from 'axios';
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import setAuthToken from "../utils/setAuthToken";
import ListView from "../../components/listView"
import SetAvailability from "../../components/setAvailability"

export default function Admin() {

    const [panel, setPanel] = useState('listView')

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [bookings, setBookings] = useState([])

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
                getBookings()
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
        client.get('/admin')
            .then((response) => {
                console.log('Found Booking: ', response.data);
                setBookings(response.data);
            })
            .catch(error => console.error("Failed to fetch bookings:", error));
    }

    if (isAuthenticated) {
        return (
            <main className="bg-white h-[100vh]">
                <div className="w-full min-h-[92px] bg-blueA sticky top-0 flex justify-between items-center text-white font-[425] text-nowrap">
                    <div className="flex items-center  basis-1/3">
                        <Link className="mx-10" href="/" onClick={() => setTimeout(() => { setIsAuthenticated(false) }, 1000)}>Logout</Link>
                    </div>
                    <div className="flex gap-10 justify-center  basis-1/3">
                        <p onClick={() => { setPanel('listView') }} className={`${panel === 'listView' ? 'text-navLinkActiveSize text-navLinkActiveColor' : 'text-navLinkInactiveSize text-navLinkInactiveColor'} text-2xl ${panel != "listView" ? 'hover:text-navLinkHoverColor' : ''}`}>List View</p>
                        <p onClick={() => { setPanel('setAvailability') }} className={`${panel === 'setAvailability' ? 'text-navLinkActiveSize text-navLinkActiveColor' : 'text-navLinkInactiveSize text-navLinkInactiveColor'} text-2xl ${panel != "setAvailability" ? 'hover:text-navLinkHoverColor' : ''}`}>Calendar View</p>
                    </div>
                    <div className="basis-1/3"></div>
                </div>
                <div className={`${panel === "listView" ? 'visible' : 'invisible'}`}>
                    <ListView bookings={bookings} />
                </div>
                <div className={`${panel === "setAvailability" ? 'visible' : 'invisible'}`}>
                    <SetAvailability />
                </div>
            </main>
        )
    } else {
        return (
            <main className="flex items-center justify-center h-[100vh]">
                <form onSubmit={handleLogin} className="translate-y[5vh] flex flex-col justify-center items-center">
                    <div className="text-6xl text-[#DC0000] font-bold mb-10">218 Admin Panel</div>
                    <div className="flex mt-10">
                        <input type="password" value={password} placeholder=" password" onChange={(e) => setPassword(e.target.value)} className="text-black mr-14 rounded-md scale-125"></input>
                        <button type="submit">Continute</button>
                    </div>
                </form>
            </main>
        )
    }
}