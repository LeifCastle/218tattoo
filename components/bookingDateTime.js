"use client"

import axios from 'axios';
import Image from 'next/image';
import moment from 'moment';
import { useEffect, useState, useRef, use } from 'react';

export default function BookingDateTime({ booked, errors, hideBar, setDateTime }) {
    const client = axios.create({
        baseURL: process.env.NEXT_PUBLIC_SERVER_URL
    });

    const [bookedDateTimes, setBookedDateTimes] = useState({})
    const [selectedMonth, setSelectedMonth] = useState(moment())
    const [selectedWeekends, setSelectedWeekends] = useState([])
    const [timeOptions, setTimeOptions] = useState()
    const [selectedDay, setSelectedDay] = useState('') //Auto populate: { day: moment().format('M-D'), which: moment().day() }
    const [selectedTime, setSelectedTime] = useState('') //Auto populate: "12:00 PM"
    const [boundary, setBoundary] = useState('start') //Hides the next/prev month arrow as needed

    const dateTimeBar = useRef(null)

    let SaturdayTimes = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM"]
    let SundayTimes = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]

    let dynamicColumns = 5;

    useEffect(() => {
        if (booked) {
            setSelectedDay('')
            setSelectedTime('')
            setDateTime('')
        }
    })


    //Converts chosen date and time to a Date variable
    useEffect(() => {
        if (selectedDay && selectedTime) {
            const selectedDateTimeString = `${moment().format('YYYY')}-${selectedMonth.format('MM')}-${selectedDay.day} ${selectedTime}`;
            const selectedDateTimeMoment = moment(selectedDateTimeString, "YYYY-M-D h:mm A");
            setDateTime(selectedDateTimeMoment.toDate());
            console.log('Selcted Month: ', selectedMonth.format('MM'))
            console.log('Selcted Day: ', selectedDay.day)
            console.log('Selcted Time: ', selectedTime)
            console.log('Date Variable: ', selectedDateTimeMoment.toDate())
        }
    }, [selectedDay, selectedTime])

    //--Sets the appropriates times for each day **(need to check availability from admin controled options with backend)
    useEffect(() => {
        if (selectedDay.which === 1 || selectedDay.which === 6) { //If the day is a saturday reassign saturday time values
            SundayTimes = SaturdayTimes;
        }
        setTimeOptions(SundayTimes.map(time => {
            let bookedDate = `${selectedMonth.format('M')}-${selectedDay.day}`
            return (
                <div key={time + 1}
                    onClick={() => {
                        if (selectedTime === time) {
                            setSelectedTime('')
                            setDateTime('')
                        } else {
                            setSelectedTime(time)
                        }
                    }}
                    className={`${bookedDateTimes[bookedDate]?.includes(time) ? 'hidden' : selectedTime === time ? 'bg-blue-500 hover:scale-105' : 'hover:scale-105 bg-white/15 hover:bg-white/30'} rounded-[12px] p-2`}>{time}</div>
            )
        }))
    }, [selectedDay, selectedTime])

    //--Set inital values & get initial date times already booked
    useEffect(() => {
        setSelectedWeekends(getWeekends(moment().format('M'), moment().format('YYYY')))
        client
            .get('/admin')
            .then(response => {
                const updatedBookedDateTimes = {};
                response.data.forEach(dateTime => {
                    const dayFormatted = moment(dateTime.dateTime).format('M-D');
                    const timeFormatted = moment(dateTime.dateTime).format('h:mm A');
                    // Check if the day key already exists; if not, initialize it as an empty array
                    if (!updatedBookedDateTimes[dayFormatted]) {
                        updatedBookedDateTimes[dayFormatted] = [];
                    }
                    // Add the time to the day's array
                    updatedBookedDateTimes[dayFormatted].push(timeFormatted);
                });
                // Update state with the newly built object
                setBookedDateTimes(updatedBookedDateTimes);
                console.log('Booked: ', updatedBookedDateTimes)
            })
    }, [booked])

    //--Returns all the weekeends in a given month
    function getWeekends(month, year) {
        const weekends = []
        let date = moment({ year, month: month - 1, day: 1 }); //Subtracting 1 to account for zero indexing of months (.format method is not zero indexed)
        let weekendCount = 2;  //Use to determine which column the date will be assigned, currently accounts for crossover (weekend split over two months)
        for (let i = 0; i <= date.daysInMonth(); i++) {
            if (date.day() === 6 && date.format('MMDD') > moment().format('MMDD')) {
                weekends.push({ day: date.format('D'), which: 1 }) // Saturday (row 1)
                weekendCount++
            } else if (date.day() === 0 && date.format('MMDD') > moment().format('MMDD')) {
                if (weekendCount === 2) { //Accounts for weekends split over the month **need to add a greyed out value to object as well or turn into a placeholder value
                    weekends.push({ day: date.clone().subtract(1, 'days').format('M-D'), which: 1 })
                    weekendCount++
                }
                weekends.push({ day: date.format('D'), which: 2 }) //Sunday (row 2)
            }
            date.add(1, 'days')
        }
        weekends.length <= 8 ? dynamicColumns = 4 : dynamicColumns = 5;
        return weekends;
    }

    //--Advances the calendar to the previous month **need to add something to allow crossover into last year
    function prevMonth() {
        if (parseInt(selectedMonth.format('M')) > parseInt(moment().format('M'))) {
            let prevMonth = selectedMonth.subtract(1, 'months')
            setSelectedMonth(moment(prevMonth))
            setSelectedWeekends(getWeekends(prevMonth.format('M'), prevMonth.format('YYYY')))
            setBoundary('');
            if (parseInt(selectedMonth.format('M')) <= parseInt(moment().format('M'))) {
                setBoundary('start');
            }
        }
    }
    //--Advances the calendar to the next month **need to add something to allow crossover into next year
    function nextMonth() {
        if (parseInt(selectedMonth.format('M')) < parseInt(moment().add(6, 'months').format('M'))) {
            let nextMonth = selectedMonth.add(1, 'months')
            setSelectedMonth(moment(nextMonth))
            let newWeekends = getWeekends(nextMonth.format('M'), nextMonth.format('YYYY'))
            setSelectedWeekends(newWeekends)
            setBoundary('');
            if (parseInt(selectedMonth.format('M')) >= parseInt(moment().add(6, 'months').format('M'))) {
                setBoundary('end');
            }
        }
    }

    return (
        <>
            <div className="bg-blackA flex flex-col items-center justify-center">
                <div ref={dateTimeBar} className="overflow-y-hidden transition-height ease-in-out duration-500">
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center justify-center mt-8">
                            <Image className={`rounded-lg Tablet:hover:scale-125 transition-transform ease-in-out duration-500 cursor-pointer ${boundary === 'start' ? 'invisible' : 'visible'}`}
                                src="/leftArrowWhite.png"
                                width={30}
                                height={30}
                                alt="NextPic"
                                onClick={() => prevMonth()}
                            />
                            <p className="text-2xl mx-10">{selectedMonth.format('MMMM')}</p>
                            <Image className={`rounded-lg Tablet:hover:scale-125 transition-transform ease-in-out duration-500 cursor-pointer ${boundary === 'end' ? 'invisible' : 'visible'}`}
                                src="/rightArrowWhite.png"
                                width={30}
                                height={30}
                                alt="NextPic"
                                onClick={() => nextMonth()}
                            />
                        </div>
                        <div className={`grid grid-cols-[80px_repeat(${dynamicColumns}, minmax(10px, 100px))] grid-rows-2 gap-x-2 gap-y-2 Mobile-M:gap-x-3 Mobile-M:gap-y-3 Tablet:gap-x-6 Tablet:gap-y-6 Tablet:text-xl px-4 Mobile-M:px-6 Tablet:px-10 py-8 place-items-center`}>
                            <div className="hidden Mobile-L:block Mobile-L:text-md Tablet:text-xl row-start-1 col-start-1">Saturday</div>
                            <div className="hidden Mobile-L:block Mobile-L:text-md Tablet:text-xl row-start-2 col-start-1">Sunday</div>
                            {selectedWeekends.map((weekend) => {
                                return (
                                    <div key={weekend.day} onClick={() => {
                                        if (selectedDay.day === weekend.day) {
                                            setSelectedDay('')
                                            setDateTime('')
                                        } else {
                                            setSelectedDay(weekend)
                                        }
                                    }}
                                        className={`${selectedDay.day === weekend.day ? 'bg-blue-500' : 'bg-white/15 hover:bg-white/30'} transition-all ease-in-out duration-250
                                        row-start-${weekend.which} flex items-center justify-center 
                                        rounded-[12px] w-[50px] h-[50px] Tablet:w-[80px] Tablet:h-[80px] hover:scale-110 hover:font-bold cursor-pointer`}>
                                        {weekend.day}</div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={`${selectedDay === '' ? 'hidden' : 'block'} flex flex-wrap justify-center gap-6 Tablet:gap-12 py-6 overflow-hidden`}>
                        {timeOptions}
                    </div>
                </div>

                {/* Finalize Booking (without payment for now) */}
                <div className="w-full flex justify-center py-10">
                    <button type="submit" className={`${booked ? 'cursor-default' : 'hover:scale-[1.15]'} bg-blueA rounded-md p-5 text-2xl duration-[750ms]`}>Book Your Appointment</button>
                </div>
            </div>
        </>
    )
}
