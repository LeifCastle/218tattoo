"use client"

import axios from 'axios';
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import setAuthToken from "../utils/setAuthToken";
import SetAvailability from "../../components/setAvailability"
import moment from 'moment';
import Image from 'next/image';

export default function Admin() {

    const [panel, setPanel] = useState('listView')

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    const [viewAll, setViewAll] = useState(false)
    const bookings = useRef([])
    const [filteredBookings, setFilteredBookings] = useState([])

    const toggleDateSort = useRef(false) //sorting booking by ascending/decending order


    const bookingGrid = useRef(null)
    const [viewPort, setViewport] = useState('list')
    const [expanded, setExpanded] = useState(false)
    const [expandedBooking, setExpandedBooking] = useState(false)
    const [bookingActionMessage, setBookingActionMessage] = useState(null)

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

    const cancelBooking = async (booking) => {
        try {
            console.log('Deleteing booking: ', {booking})
            const response = await client.post('/admin/cancelBooking', { id : booking });
            console.log('Response: ', response);
            setBookingActionMessage('cancelled')
            getBookings()
            setTimeout(() => {
                filterBookings('none')
                setBookingActionMessage(null)
                setExpanded(false)
            }, 1250)
        }
        catch (error) {
            console.log(error)
        }
    }

    function getBookings() {
        return client.get('/admin')
            .then((response) => {
                console.log('Found Bookings: ', response.data);
                bookings.current = response.data;
            })
            .catch(error => console.error("Failed to fetch bookings:", error));
    }

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

    function sortBookings(sort) {
        switch (sort) {
            case 'date':
                toggleDateSort.current = !toggleDateSort.current
                toggleDateSort.current ?
                    setFilteredBookings([...filteredBookings].sort((a, b) => moment(a.dateTime).toDate() - moment(b.dateTime).toDate()))
                    :
                    setFilteredBookings([...filteredBookings].sort((a, b) => moment(b.dateTime).toDate() - moment(a.dateTime).toDate()));
                break;

        }
    }

    if (isAuthenticated) {
        return (
            <main className="bg-white h-[100vh] flex flex-col items-center">
                <div className="w-full min-h-[92px] bg-[#444444] sticky top-0 flex justify-between items-center text-white font-[425] text-nowrap">
                    <div className="flex items-center  basis-1/3">
                        <Link className="mx-10" href="/" onClick={() => setTimeout(() => { setIsAuthenticated(false) }, 1000)}>Logout</Link>
                    </div>
                    <div className="flex gap-10 justify-center  basis-1/3">
                        <p onClick={() => { setPanel('listView') }} className={`${panel === 'listView' ? 'text-navLinkActiveSize text-navLinkActiveColor' : 'text-navLinkInactiveSize text-navLinkInactiveColor'} text-2xl ${panel != "listView" ? 'hover:text-navLinkHoverColor' : ''}`}>List View</p>
                        <p onClick={() => { setPanel('setAvailability') }} className={`${panel === 'setAvailability' ? 'text-navLinkActiveSize text-navLinkActiveColor' : 'text-navLinkInactiveSize text-navLinkInactiveColor'} text-2xl ${panel != "setAvailability" ? 'hover:text-navLinkHoverColor' : ''}`}>Calendar View</p>
                    </div>
                    <div className="basis-1/3"></div>
                </div>
                {/**** Page ****/}
                <div className='flex flex-col Tablet:flex-row w-full h-full'>
                    <div className='flex justify-center w-full h-full pt-10 Tablet:w-[25vw] border-r-[1px] border-pageGrey'>
                        <div className={`${viewAll === true ? 'bg-toggleSelected text-white' : 'bg-toggleUnselected text-black'} hover:cursor-pointer flex justify-center items-center w-[100px] h-[32px] rounded-tl-lg rounded-bl-lg`}
                            onClick={() => {
                                filterBookings('none')
                                setViewAll(true)
                            }}>All</div>
                        <div className={`${viewAll === false ? 'bg-toggleSelected text-white' : 'bg-toggleUnselected text-black'} hover:cursor-pointer flex justify-center items-center w-[100px] h-[32px] rounded-tr-lg rounded-br-lg`}
                            onClick={() => {
                                filterBookings('current')
                                setViewAll(false)
                            }}>Current</div>
                    </div>
                    {/**** List View ****/}
                    <div id="test" className={`${panel === "listView" ? 'block' : 'hidden'} relative flex items-start justify-center w-full p-10`}>
                        <div className="bg-white rounded-md text-black flex flex-col items-center justify-center text-xl">
                            <div ref={bookingGrid} className="grid grid-cols-listView grid-rows-[50px] auto-rows-[40px] place-items-center border-pageGrey border-[1px] rounded">
                                <div className="text-xl row-start-1 col-start-1 bg-pageGrey w-full h-full flex items-center justify-center">Service</div>
                                <div className="text-xl row-start-1 col-start-2 bg-pageGrey w-full h-full flex items-center justify-center gap-2">Date
                                    <div className='flex flex-col text-xs text-[#787878] hover:cursor-pointer p-1' onClick={() => sortBookings('date')}>
                                        <p className='translate-y-[2px] hover:cursor-pointer'>&#x25B2;</p>
                                        <p className='translate-y-[-2px] hover:cursor-pointer'>&#x25BC;</p>
                                    </div>
                                </div>
                                <div className="text-xl row-start-1 col-start-3 bg-pageGrey w-full h-full flex items-center justify-center">Time</div>
                                <div className="text-xl row-start-1 col-start-4 bg-pageGrey w-full h-full flex items-center justify-center">Name</div>
                                {filteredBookings.map(booking => {
                                    return (
                                        <div key={booking._id}
                                            onClick={() => {
                                                setExpanded(true)
                                                setExpandedBooking(booking)
                                            }}
                                            className="h-full w-full flex items-center col-span-4 grid grid-cols-listView gap-y-1 text-center hover:bg-blackA/10 border-[1px] border-pageGrey hover:cursor-pointer">
                                            <p className="hover:cursor-pointer">{booking.info.service.service}</p>
                                            <p className="hover:cursor-pointer">{moment(booking.dateTime).format('MM/DD')}</p>
                                            <p className="hover:cursor-pointer">{moment(booking.dateTime).format('h:mm A')}</p>
                                            <p className="hover:cursor-pointer">{booking.info.contact.firstName + " " + booking.info.contact.lastName}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        {/***********| Expanded Boooking View |***********/}
                        <div className={`${!expanded ? 'hidden' : 'block'} absolute top-0 left-0 w-full h-full flex flex-col min-h-[40vh] bg-pageGrey text-black hover:pointer-default`}>
                            <div className="bg-toggleSelected text-white text-3xl flex items-center justify-center">
                                <div className='flex items-center justify-center gap-3 px-3 hover:cursor-pointer' onClick={() => setExpanded(false)}>
                                    <Image className=""
                                        src="/returnArrow.png"
                                        width={50}
                                        height={50}
                                        alt="Return"
                                    />
                                    <p className='hover:cursor-pointer'>Return</p>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <div className='w-full flex justify-center py-6'>
                                    <p className="text-5xl">{expandedBooking?.info?.contact?.firstName + " " + expandedBooking?.info?.contact?.lastName}</p>
                                </div>
                                {/*****| Service |*****/}
                                <p className="pl-6 pb-3 text-2xl">{expandedBooking?.info?.service?.service}</p>
                                <div className='flex'>
                                    <div className='flex flex-col gap-2 shrink w-auto bg-white ml-10 p-4 rounded'>
                                        {/* Count */}
                                        <div className={`${expandedBooking?.info?.service?.service === "Tooth" ? 'block' : 'hidden'} flex`}>
                                            <p className="text-xl pr-2">Gem Count: </p>
                                            <p className="text-xl">{expandedBooking?.info?.service?.count}</p>
                                        </div>
                                        {/* Comments */}
                                        <div className='flex'>
                                            <p className="text-xl pr-2">{expandedBooking?.info?.service?.service === 'Tattoo' ? 'Description: ' : 'Comments: '}</p>
                                            <p className="text-xl">{expandedBooking?.info?.service?.comments}</p>
                                        </div>
                                    </div>
                                    <div></div>
                                </div>
                                {/*****| Appointment |*****/}
                                <p className='pl-6 pb-3 text-2xl mt-10'>Appointment </p>
                                <div className='flex'>
                                    {/* Date & Time */}
                                    <div className='flex shrink w-auto bg-white rounded ml-10 p-4'>
                                        <p className="text-xl mr-4">{moment(expandedBooking?.dateTime).format('MM/DD')}</p>
                                        <p className="text-xl">{moment(expandedBooking?.dateTime).format('h:mm A')}</p>
                                    </div>
                                    <div></div>
                                </div>
                                {/*****| Contact |*****/}
                                <p className='pl-6 pb-3 text-2xl mt-10'>Contact </p>
                                <div className='flex'>
                                    <div className='flex flex-col gap-2 shrink w-auto bg-white ml-10 p-4 rounded'>
                                        {/* Phone */}
                                        <div className={'flex'}>
                                            <p className="text-xl pr-2">Phone: </p>
                                            <p className="text-xl">{expandedBooking?.info?.contact?.phone}</p>
                                        </div>
                                        {/* Email */}
                                        <div className='flex'>
                                            <p className="text-xl pr-2">Email: </p>
                                            <p className="text-xl">{expandedBooking?.info?.contact?.email}</p>
                                        </div>
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                            <div className='grow'></div>
                            {/*****| Cancel / Postpone |*****/}
                            <div className='flex w-full text-center text-3xl font-medium text-[#444444]'>
                                <div className='basis-1/2 bg-red-200 py-4 hover:cursor-pointer' onClick={() => cancelBooking(expandedBooking._id)}>Cancel</div>
                                <div className='basis-1/2 bg-blue-200 py-4 hover:cursor-pointer'>Postpone</div>
                            </div>
                            {/*****| Booking Action Message |*****/}
                            <div className={`${!bookingActionMessage ? 'hidden' : 'block'} absolute w-full h-full flex justify-center items-center bg-pageGrey`}> 
                                <p className='text-4xl text-black'>Success! Booking Cancelled</p>
                            </div>
                        </div>
                    </div>
                    {/**** Calendar View ****/}
                    <div className={`${panel === "setAvailability" ? 'block' : 'hidden'}`}>
                        <SetAvailability />
                    </div>
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