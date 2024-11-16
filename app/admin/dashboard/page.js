"use client"

import axios from 'axios';
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import SetAvailability from "../../../components/setAvailability"
import moment from 'moment';
import Image from 'next/image';
import StripeOneTimePayment from "../../../components/stripeOneTimePayment"
import BookingDateTime from "../../../components/bookingDateTime"

export default function Dashboard() {

    const [nav, setNav] = useState('Dashboard')
    const [mobileNav, setMobileNav] = useState(false)
    const [panel, setPanel] = useState('listView')

    const [viewAll, setViewAll] = useState(false)
    const bookings = useRef([])
    const [filteredBookings, setFilteredBookings] = useState([])

    const toggleDateSort = useRef(false) //sorting booking by ascending/decending order
    const [payment, setPayment] = useState(false)
    const [serviceCost, setServiceCost] = useState()

    const bookingGrid = useRef(null)
    const [viewPort, setViewport] = useState('list')
    const [expanded, setExpanded] = useState(false)
    const [expandedBooking, setExpandedBooking] = useState(false)
    const [expandedImage, setExpandedImage] = useState(false);
    const [bookingActionMessage, setBookingActionMessage] = useState(null)
    const [dateTime, setDateTime] = useState('')
    const [selectedDay, setSelectedDay] = useState('')
    const [booked, setBooked] = useState(false)
    const [sidebarCollapsed, setSidebarCollapse] = useState(false)

    const client = axios.create({
        baseURL: process.env.NEXT_PUBLIC_SERVER_URL
    });

    useEffect(() => {
        const fetchData = async () => {
            await getBookings()
            filterBookings('current') //Sets the user's view to only current bookings rather than all
        }
        fetchData()
    }, [])

    const cancelBooking = async (booking) => {
        try {
            console.log('Deleteing booking: ', { booking })
            const response = await client.post('/admin/cancelBooking', { id: booking });
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

    async function getBookings() {
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

    //--Move booking (update the date/time)
    function moveBooking(booking) {
        client.put('/book/move', {
            id: booking,
            dateTime: dateTime,
        })
            .then(response => {
                setBooked(true);
                getBookings().then(() => {
                    filterBookings('current')
                    setExpandedBooking(bookings.current.find((booking) => {
                        return booking.info._id === expandedBooking.info._id
                    }))
                })

            })
            .catch(error => {
                console.log('Error: ', error)
            })
    }

    return (
        <main className="bg-white h-[100vh] flex items-center">
            {/********** | Sidebar Nav | **********/}
            <aside className={`${mobileNav ? 'sticky left-0 items-center Tablet:items-start bg-mobileNavBg Tablet:bg-transparent' : 'transparent'} absolute Tablet:relative w-full ${sidebarCollapsed ? 'Tablet:w-[70px]' : 'Tablet:w-[20vw]'} h-full text-black border-r-[1px] border-grey flex flex-col justify-between transition-all duration-[400ms] ease-in-out`}>
                <div className='flex items-center border-b-[1px] border-grey h-[80px]'>
                    <p className={`${sidebarCollapsed ? 'text-white hidden' : 'hidden Tablet:block'} w-full text-center py-6 text-3xl`}>Admin Panel</p>
                    <Image className={`rounded-lg Tablet:hover:scale-110 transition-transform ease-in-out duration-500 cursor-pointer mx-4 ${sidebarCollapsed ? 'rotate-180' : ''}`}
                        src="/sidebarCollapse.png"
                        width={40}
                        height={40}
                        alt="Collapse Sidebar"
                        onClick={() => setSidebarCollapse(!sidebarCollapsed)}
                    />
                </div>
                <div className={`${mobileNav ? 'flex z-[5] justify-center text-white text-[3rem] Tablet:text-black Tablet:justify-start Tablet:text-xl' : 'hidden Tablet:flex text-black text-xl'} flex flex-col gap-3 pt-8 grow`}>
                    {/****Dashboard ****/}
                    <div className={`${sidebarCollapsed ? 'justify-center px-2' : 'px-10'} w-full flex transition-all ease-in-out duration-500`}>
                        <p className={`${sidebarCollapsed ? 'hidden' : 'block'} hover:bg-adminNavHover hover:cursor-pointer rounded p-1 pl-2`} onClick={() => {
                            setNav('Dashboard')
                            setMobileNav(false)
                        }}>Dashboard</p>
                        <Image className={`${sidebarCollapsed ? 'block' : 'hidden'} Tablet:hover:scale-110 transition-transform ease-in-out duration-500 cursor-pointer`}
                            src={`${nav === 'Dashboard' ? '/dashboardIconSelected.png' : '/dashboardIcon.png'}`}
                            width={40}
                            height={40}
                            alt="Dashboard"
                            onClick={() => {
                                setNav('Dashboard')
                                setMobileNav(false)
                            }}
                        />
                    </div>
                    {/****Bookings ****/}
                    <div className={`${sidebarCollapsed ? 'justify-center px-2' : 'px-10'} w-full flex transition-all ease-in-out duration-500`}>
                        <p className={`${sidebarCollapsed ? 'hidden' : 'block'} hover:bg-adminNavHover hover:cursor-pointer rounded p-1 pl-2`} onClick={() => {
                            setNav('Bookings')
                            setMobileNav(false)
                        }}>Boookings</p>
                        <Image className={`${sidebarCollapsed ? 'block' : 'hidden'} Tablet:hover:scale-110 transition-transform ease-in-out duration-500 cursor-pointer`}
                            src={`${nav === 'Bookings' ? '/bookingIconSelected.png' : '/bookingIcon.png'}`}
                            width={40}
                            height={40}
                            alt="Bookings"
                            onClick={() => {
                                setNav('Bookings')
                                setMobileNav(false)
                            }}
                        />
                    </div>
                    {/**** Sales ****/}
                    <div className={`${sidebarCollapsed ? 'justify-center px-2' : 'px-10'} w-full flex transition-all ease-in-out duration-500`}>
                        <p className={`${sidebarCollapsed ? 'hidden' : 'block'} hover:bg-adminNavHover hover:cursor-pointer rounded p-1 pl-2`} onClick={() => {
                            setNav('Sales')
                            setMobileNav(false)
                        }}>Sales</p>
                        <Image className={`${sidebarCollapsed ? 'block' : 'hidden'} Tablet:hover:scale-110 transition-transform ease-in-out duration-500 cursor-pointer`}
                            src={`${nav === 'Sales' ? '/salesIconSelected.png' : '/salesIcon.png'}`}
                            width={40}
                            height={40}
                            alt="Sales"
                            onClick={() => {
                                setNav('Sales')
                                setMobileNav(false)
                            }}
                        />
                    </div>
                    {/**** Settings ****/}
                    <div className={`${sidebarCollapsed ? 'justify-center px-2' : 'px-10'} w-full flex transition-all ease-in-out duration-500`}>
                        <p className={`${sidebarCollapsed ? 'hidden' : 'block'} hover:bg-adminNavHover hover:cursor-pointer rounded p-1 pl-2`} onClick={() => {
                            setNav('Settings')
                            setMobileNav(false)
                        }}>Settings</p>
                        <Image className={`${sidebarCollapsed ? 'block' : 'hidden'} Tablet:hover:scale-110 transition-transform ease-in-out duration-500 cursor-pointer`}
                            src={`${nav === 'Settings' ? '/settingsIconSelected.png' : '/settingsIcon.png'}`}
                            width={40}
                            height={40}
                            alt="Settings"
                            onClick={() => {
                                setNav('Settings')
                                setMobileNav(false)
                            }}
                        />
                    </div>
                </div>
                <div className="flex w-full justify-center items-center py-4 text-xl bg-adminNavHover">
                    <Link className="" href="/" onClick={() => setTimeout(() => {
                        document.cookie = "adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // This sets the cookie to an expired date
                        localStorage.removeItem('adminToken');
                    }, 1000)}>Logout</Link>
                </div>
                <div>
                </div>
            </aside>
            {/********** | Content | **********/}
            <div className='w-full h-full flex flex-col'>
                {/**** Header ****/}
                <div className="sticky top-0 w-full py-5 bg-[#888888] Tablet:bg-adminNavHover sticky top-0 flex justify-between px-10 items-center text-black text-4xl">
                    <p className='text-white Tablet:text-black text-center w-full'>{nav}</p>
                    <div className="Tablet:hidden " onClick={() => setMobileNav(!mobileNav)}>
                        <div className={`${mobileNav ? "rotate-[-45deg] translate-y-[2.5px]" : ""} w-[30px] h-[5px] rounded-full ${mobileNav ? 'bg-blackA' : 'bg-white'} transition-all duration-[400ms] ease-in-out`}></div>
                        <div className={`${mobileNav ? "hidden" : "translate-x-[5px] w-[25px] h-[5px] rounded-full my-1"} ${mobileNav ? 'bg-blackA' : 'bg-white'} transition-all duration-[400ms] ease-in-out`}></div>
                        <div className={`${mobileNav ? "rotate-[45deg] translate-y-[-2.5px]" : ""} w-[30px] h-[5px] rounded-full  ${mobileNav ? 'bg-blackA' : 'bg-white'} transition-all duration-[400ms] ease-in-out`}></div>
                    </div>
                </div>

                {/**** Dashboard ****/}
                <div className={`${nav === 'Dashboard' ? 'block' : 'hidden'} 'flex flex-col w-full p-8 `}>
                    {/* Block/Unblock booking dates */}
                    <div className='w-full Tablet:w-[30%] flex flex-col items-center'>
                        <p className='text-2xl text-black'>Set Booking Availability </p>
                        <div className='relative flex flex-col items-center justify-center w-full bg-[#FAF9F9] rounded shrink mt-4 border-[1px] border-grey rounded shadow-md'>
                            <BookingDateTime booked={booked} setBooked={setBooked} setDateTime={setDateTime} selectedDay={selectedDay} setSelectedDay={setSelectedDay} theme="small" />
                            <div className='absolute top-0 flex w-full justify-between px-4 pt-2 text-lg'>
                                <button className={`${selectedDay ? 'visible' : 'invisible'} font-semibold text-red-500`}
                                    onClick={() => {
                                        setDateTime('')
                                        setSelectedDay('')
                                    }}>Clear</button>
                                <button className={`${dateTime ? 'visible' : 'invisible'} font-semibold text-progressBarComplete`} onClick={() => moveBooking(expandedBooking._id)}>Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/**** Bookings ****/}
                <div className={`${nav === 'Bookings' ? 'block' : 'hidden'} relative w-full h-[calc(100%-80px)] flex flex-col p-10`}>

                    {/**** Booking Filters & View Settings ****/}
                    <div className={`${!expanded ? 'block' : 'hidden Tablet:flex'} flex gap-12 items-center pb-10`}>
                        {/* List/Calendar View */}
                        <div className='flex'>
                            <div className={`${panel === 'listView' ? 'bg-toggleSelected text-white' : 'bg-toggleUnselected text-black'} hover:cursor-pointer flex justify-center items-center w-[100px] h-[32px] rounded-tl-lg rounded-bl-lg`}
                                onClick={() => {
                                    setPanel('listView')
                                }}>List
                            </div>
                            <div className={`${panel === 'calendarView' ? 'bg-toggleSelected text-white' : 'bg-toggleUnselected text-black'} hover:cursor-pointer flex justify-center items-center w-[100px] h-[32px] rounded-tr-lg rounded-br-lg`}
                                onClick={() => {
                                    setPanel('calendarView')
                                }}>Calendar
                            </div>
                        </div>
                        {/* All / Current Bookings */}
                        <div className='flex'>
                            <div className={`${viewAll === true ? 'bg-toggleSelected text-white' : 'bg-toggleUnselected text-black'} hover:cursor-pointer flex justify-center items-center w-[100px] h-[32px] rounded-tl-lg rounded-bl-lg`}
                                onClick={() => {
                                    filterBookings('none')
                                    setViewAll(true)
                                }}>All
                            </div>
                            <div className={`${viewAll === false ? 'bg-toggleSelected text-white' : 'bg-toggleUnselected text-black'} hover:cursor-pointer flex justify-center items-center w-[100px] h-[32px] rounded-tr-lg rounded-br-lg`}
                                onClick={() => {
                                    filterBookings('current')
                                    setViewAll(false)
                                }}>Current
                            </div>
                        </div>
                    </div>

                    {/**** List View ****/}
                    <div id="test" className={`${panel === "listView" ? 'block' : 'hidden'} flex items-start justify-center w-full overflow-y-auto`}>
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
                                                setServiceCost(0);
                                            }}
                                            className="h-full w-full flex items-center col-span-4 grid grid-cols-listView gap-y-1 text-center Tablet:hover:bg-blackA/10 border-[1px] border-pageGrey hover:cursor-pointer">
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
                        <div className={`${!expanded ? 'hidden' : 'flex'} absolute top-0 left-0 w-full h-full flex-col min-h-[40vh] bg-white text-black`}>
                            <div
                                className="absolute flex items-center justify-center z-[4] bg-[#F1F1F1] left-0 top-0 rounded-md shadow-md w-[44px] h-[44px] group hover:cursor-pointer border-[1px] border-grey mt-[5px] ml-[5px]"
                                onClick={() => {
                                    expandedImage ? setExpandedImage(false) : !payment ? setExpanded(false) : setPayment(false)
                                }}>
                                <div className='group-hover:scale-[1.15] transition ease-in-out duration-500 hover:cursor-pointer'>
                                    <div className="rotate-[-45deg] translate-y-[2.5px] w-[30px] h-[5px] rounded-full bg-blackA transition-all duration-[400ms] ease-in-out hover:cursor-pointer group-hover:bg-progressBarComplete"></div>
                                    <div className="rotate-[45deg] translate-y-[-2.5px] w-[30px] h-[5px] rounded-full bg-blackA transition-all duration-[400ms] ease-in-out hover:cursor-pointer group-hover:bg-progressBarComplete"></div>
                                </div>
                            </div>
                            <div className='flex flex-col Laptop:flex-row row w-full mt-10 bg-white'>
                                {/*--------------------| Left Side |--------------------*/}
                                <div className='basis-2/3 border-b-[2px] Laptop:border-b-[0px] Laptop:border-r-[2px] border-grey flex flex-col ml-10'>
                                    <div className='w-full flex justify-center pb-6'>
                                        <p className="text-5xl">{expandedBooking?.info?.contact?.firstName + " " + expandedBooking?.info?.contact?.lastName}</p>
                                    </div>
                                    {/*****| Appointment |*****/}
                                    <p className='pl-6 text-2xl'>Appointment </p>
                                    {/* Date & Time */}
                                    <div className='flex ml-10 p-4'>
                                        <p className="text-xl mr-4">{moment(expandedBooking?.dateTime).format('MM/DD')}</p>
                                        <p className="text-xl">{moment(expandedBooking?.dateTime).format('h:mm A')}</p>
                                    </div>
                                    {/*****| Service |*****/}
                                    <p className="pl-6 text-2xl mt-6">{expandedBooking?.info?.service?.service}</p>
                                    <div className='flex flex-col gap-2 ml-10 p-4'>
                                        {/* Count */}
                                        <div className={`${expandedBooking?.info?.service?.service === "Tooth" ? 'block' : 'hidden'} flex`}>
                                            <p className="text-xl pr-2">Gem Count: </p>
                                            <p className="text-xl">{expandedBooking?.info?.service?.count}</p>
                                        </div>
                                        {/* Comments */}
                                        <div className='flex'>
                                            <p className="text-xl pr-2">{expandedBooking?.info?.service?.service === 'Tattoo' ? 'Description: ' : 'Comments: '}</p> {/* Bug: doesn't work as expected becuase exapanded booking isn't loaded at first so it always goes to comments */}
                                            <p className="text-xl">{expandedBooking?.info?.service?.comments}</p>
                                        </div>
                                    </div>
                                    {/*****| Contact |*****/}
                                    <p className='pl-6 text-2xl mt-6'>Contact </p>
                                    <div className='flex flex-col gap-2 ml-10 p-4'>
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
                                    {/*****| Reference Photos |*****/}
                                    <p className={`${expandedBooking?.info?.service?.referencePhotos.length > 0 ? 'block' : 'hidden'} pl-6 pb-3 text-2xl mt-6`}>Reference Photos </p>
                                    <div className='flex gap-4 ml-10 p-4'>
                                        {expandedBooking?.info?.service?.referencePhotos.map((photo, index) => {
                                            return (<Image onClick={() => setExpandedImage(photo)} key={index} alt="reference photo" className='rounded' src={photo} width={200} height={200} />)
                                        }
                                        )}
                                    </div>
                                </div>
                                {/*--------------------| Right Side |--------------------*/}
                                <div className='basis-1/3 flex flex-col mx-10 px-10 pb-10 items-center'>
                                    {/*****| Move Apppointment |*****/}
                                    <p className='text-2xl'>Move Appointment </p>
                                    <div className='relative flex flex-col items-center justify-center w-full bg-[#FAF9F9] rounded shrink mt-4 border-[1px] border-grey rounded shadow-md'>
                                        <BookingDateTime booked={booked} setBooked={setBooked} setDateTime={setDateTime} selectedDay={selectedDay} setSelectedDay={setSelectedDay} theme="small" />
                                        <div className='absolute top-0 flex w-full justify-between px-4 pt-2 text-lg'>
                                            <button className={`${selectedDay ? 'visible' : 'invisible'} font-semibold text-red-500`}
                                                onClick={() => {
                                                    setDateTime('')
                                                    setSelectedDay('')
                                                }}>Clear</button>
                                            <button className={`${dateTime ? 'visible' : 'invisible'} font-semibold text-progressBarComplete`} onClick={() => moveBooking(expandedBooking._id)}>Confirm</button>
                                        </div>
                                    </div>
                                    {/*****| Process Payment |*****/}
                                    <p className='text-2xl mt-10'>Process Payment </p>
                                    <div className='flex flex-col items-center justify-center text-xl mt-4 w-full bg-[#FAF9F9] rounded shrink border-[1px] border-grey rounded shadow-md'>
                                        <div className='p-6 flex flex-col items-center gap-2'>
                                            <div className='flex justify-center items-center gap-2'>
                                                <p className="mt-2 text-gray-600">Service Cost: </p>
                                                <input
                                                    id="serviceCost"
                                                    type="number"
                                                    placeholder="Enter amount"
                                                    className="mt-1 px-3 py-2 w-[40%] bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-toggleSelected focus:border-toggleSelected sm:text-sm"
                                                    onChange={(e) => setServiceCost(e.target.value)}
                                                />
                                            </div>
                                            <p className="mt-2 text-gray-600">Deposit: $0</p>
                                            <p className="mt-1 font-semibold text-gray-800">{`Total Due: $${serviceCost ? serviceCost : "0.00"}`}</p>
                                            <button onClick={() => setPayment(serviceCost)} className="mt-4 w-full bg-toggleSelected text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                Make Payment
                                            </button>
                                        </div>
                                    </div>
                                    {/*****| Cancel |*****/}
                                    <div className='mt-10 shadow-md w-full text-2xl text-center rounded bg-red-200 p-3 hover:cursor-pointer' onClick={() => cancelBooking(expandedBooking._id)}>Cancel Appointment</div>
                                </div>
                            </div>
                            {/*****| Pay Form |*****/}
                            <div className={`${payment ? 'block' : 'hidden'} absolute w-full h-full bg-white flex flex-col justify-center`}>
                                <StripeOneTimePayment payment={payment} />
                            </div>
                            {/*****| Expanded Image |*****/}
                            <div className={`${expandedImage ? 'block' : 'hidden'} absolute w-full h-full bg-white flex flex-col justify-center p-[5%] z-[2]`}>
                                <Image className='w-full h-full rounded-md object-contain' src={expandedImage} width={200} height={200} alt="expanded image"></Image>  {/* Bug: (style) image is not rounded due to object-contain class */}
                            </div>
                            {/*****| Booking Action Message |*****/}
                            <div className={`${!bookingActionMessage ? 'hidden' : 'block'} absolute z-[4] w-full h-full flex justify-center items-center bg-pageGrey`}>
                                <p className='text-4xl text-black'>Success! Booking Cancelled</p>
                            </div>
                        </div>
                    </div>
                    {/**** Calendar View ****/}
                    <div className={`${panel === "calendarView" ? 'block' : 'hidden'}`}>
                        <SetAvailability />
                    </div>
                </div>

                {/**** Sales ****/}
                <div className={`${nav === 'Sales' ? 'block' : 'hidden'} 'flex flex-col w-full h-full`}>
                    <p>Set default down payment</p>
                </div>

                {/**** Settings ****/}
                <div className={`${nav === 'Settings' ? 'block' : 'hidden'} 'flex flex-col w-full h-full`}>
                </div>
            </div>
        </main >
    )
}