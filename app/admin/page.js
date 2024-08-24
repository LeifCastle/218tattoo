"use client"

import axios from 'axios';
import Link from "next/link"
import { useEffect, useState, useRef, use } from "react"
import setAuthToken from "../utils/setAuthToken";
import ListView from "../../components/listView"
import SetAvailability from "../../components/setAvailability"
import moment from 'moment';

export default function Admin() {

    const [panel, setPanel] = useState('listView')

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    const [viewAll, setViewAll] = useState(false)
    const bookings = useRef([])
    const [filteredBookings, setFilteredBookings] = useState([])

    //Tailwind CSS Presets
    let inputName = "text-sm text-black"
    let inputField = `w-full h-[32px] rounded pl-2 text-black bg-white border-2 focus:border-teal-600 focus:outline-none hover:bg-inputHoverBg focus:bg-inputHoverBg`

    const client = axios.create({
        baseURL: process.env.NEXT_PUBLIC_SERVER_URL
    });


    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await client.post('/admin/login', { user, password });
            console.log('Response: ', response);
            // Directly access the token from response.data
            const { token } = response.data;
            if (token) {
                localStorage.setItem('adminToken', token); // Save the token
                setAuthToken(response.data.token);
                setIsAuthenticated(true);
                await getBookings()
                filterBookings('current') //Sets the user's view to only current bookings rather than all
            } else {
                // Handle case where response is successful but no token is returned
                alert('Login successful but no token received');
            }
        } catch (error) {
            setPassword("")
            // Handle HTTP error responses (status code outside 2xx)
            if (error.response) {
                console.log(error.response.data);
                alert(`Login failed: ${error.response.data.message || 'Unknown error'}`);
            } else if (error.request) {
                console.log(error.request);
                alert('No response from server');
            } else {
                alert('Error', error.message);
            }
        }
    };

    function filterBookings(filter) {
        switch (filter) {
            case 'none':
                setFilteredBookings(bookings.current)
                console.log('filtered none')
                break;
            case 'current': //Shows only bookings on or after today's date
                let today = moment()
                setFilteredBookings(bookings.current
                    .filter((booking) => {
                        const momentDateTime = moment(booking.dateTime)
                        return momentDateTime.isSameOrAfter(today, 'day');
                    })
                )
                break;
        }
    }

    function getBookings() {
        return client.get('/admin')
            .then((response) => {
                console.log('Found Booking: ', response.data);
                bookings.current = response.data;
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
                <div className='flex p-6'>
                    <div className={`${viewAll === true ? 'bg-toggleSelected text-white' : 'bg-toggleUnselected text-black'} flex justify-center items-center w-[100px] h-[32px] rounded-tl-lg rounded-bl-lg`}
                        onClick={() => {
                            filterBookings('none')
                            setViewAll(true)
                        }}>All</div>
                    <div className={`${viewAll === false ? 'bg-toggleSelected text-white' : 'bg-toggleUnselected text-black'} flex justify-center items-center w-[100px] h-[32px] rounded-tr-lg rounded-br-lg`}
                        onClick={() => {
                            filterBookings('current')
                            setViewAll(false)
                        }}>Current</div>
                </div>
                <div className={`${panel === "listView" ? 'visible' : 'invisible'}`}>
                    <ListView bookings={filteredBookings} />
                </div>
                <div className={`${panel === "setAvailability" ? 'visible' : 'invisible'}`}>
                    <SetAvailability />
                </div>
            </main>
        )
    } else {
        return (
            <main className="flex items-center justify-center h-[100vh] bg-pageGrey">
                <div className='translate-y[5vh] w-full h-[50vh] Tablet:w-[45vw] Laptop:w-[35vw] Monitor:w-[25vw] h-[60vh] bg-white rounded-md flex flex-col items-center px-3'>
                    <div className="text-3xl Mobile-L:text-4xl text-black font-bold pt-10">218 Admin Panel</div>
                    <form onSubmit={handleLogin} className="flex flex-col h-full w-full justify-center items-center max-w-[250px] Mobile-L:max-w-[300px]">
                        <div className="flex flex-col gap-2 items-start w-full">
                            <p className={`${inputName}`}>Username</p>
                            <input value={user} onChange={(e) => setUser(e.target.value)} className={`${inputField} border-inputBorder`}></input>
                        </div>
                        <div className="flex flex-col gap-2 items-start w-full mt-4">
                            <p className={`${inputName}`}>Password</p>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${inputField} border-inputBorder`}></input>
                        </div>
                        <button type="submit" className='w-full mt-8 text-lg focus:outline-none flex justify-center py-3 rounded font-semibold cursor-pointer bg-progressBarComplete text-white'>Login</button>
                    </form>
                </div>
            </main>
        )
    }
}