"use client"

import axios from 'axios';
import Image from 'next/image';
import moment from 'moment';
import { useEffect, useState, useRef } from 'react';

export default function BookingDateTime({ hideBar, dateTime, setDateTime }) {
    const client = axios.create({
        baseURL: "http://localhost:5000"
    });

    const [bookedDateTimes, setBookedDateTimes] = useState({})
    const [selectedMonth, setSelectedMonth] = useState(moment())
    const [selectedWeekends, setSelectedWeekends] = useState([])
    const [timeOptions, setTimeOptions] = useState()
    const [selectedDay, setSelectedDay] = useState('') //Auto populate: { day: moment().format('M-D'), which: moment().day() }
    const [selectedTime, setSelectedTime] = useState('') //Auto populate: "12:00 PM"

    const dateTimeBar = useRef(null)

    let SaturdayTimes = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM"]
    let SundayTimes = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]


    //Converts chosen date and time to a Date variable
    useEffect(() => {
        const selectedDateTimeString = `${moment().format('YYYY')}-${selectedDay.day} ${selectedTime}`;
        const selectedDateTimeMoment = moment(selectedDateTimeString, "YYYY-M-D h:mm A");
        setDateTime(selectedDateTimeMoment.toDate());
    }, [selectedDay, selectedTime])

    //--Sets the appropriates times for each day **(need to check availability with backend eventually)
    useEffect(() => {
        if (selectedDay.which === 1 || selectedDay.which === 6) { //If the day is a saturday reassign saturday time values
            SundayTimes = SaturdayTimes;
        }
        setTimeOptions(SundayTimes.map(time => {
            return (
                <div key={time + 1} onClick={() => setSelectedTime(time)}
                    className={`${bookedDateTimes[selectedDay.day]?.includes(time) ? 'bg-black' : selectedTime === time ? 'bg-blue-500' : 'bg-white/15 hover:bg-white/30'} rounded-[12px] p-2 hover:scale-105`}>{time}</div>
            )
        }))
        console.log("Dates: ", bookedDateTimes)
        console.log('Selected Day: ', selectedDay.day, 'Selected Time: ', selectedTime)
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
            })
    }, [])

    //--Returns all the weekeends in a given month
    function getWeekends(month, year) {
        const weekends = []
        let date = moment({ year, month: month - 1, day: 1 }); //Subtracting 1 to account for zero indexing of months (.format method is not zero indexed)
        let weekendCount = 2;  //Use to determine which column the date will be assigned, currently accounts for crossover (weekend split over two months)
        for (let i = 0; i <= date.daysInMonth(); i++) {
            if (date.day() === 6) {
                weekends.push({ day: date.format('M-D'), which: 1 }) // Saturday (row 1)
                weekendCount++
            } else if (date.day() === 0) {
                if (weekendCount === 2) { //Accounts for weekends split over the month **need to add a greyed out value to object as well or turn into a placeholder value
                    weekends.push({ day: date.clone().subtract(1, 'days').format('M-D'), which: 1 })
                    weekendCount++
                }
                weekends.push({ day: date.format('M-D'), which: 2 }) //Sunday (row 2)
            }
            date.add(1, 'days')
        }
        return weekends;
    }

    //--Advances the calendar to the previous month **need to add something to allow crossover into last year
    function prevMonth() {
        if (parseInt(selectedMonth.format('M')) > parseInt(moment().format('M'))) {
            let prevMonth = selectedMonth.subtract(1, 'months')
            setSelectedMonth(moment(prevMonth))
            setSelectedWeekends(getWeekends(prevMonth.format('M'), prevMonth.format('YYYY')))
        }
    }
    //--Advances the calendar to the next month **need to add something to allow crossover into next year
    function nextMonth() {
        if (parseInt(selectedMonth.format('M')) < parseInt(moment().add(6, 'months').format('M'))) {
            let nextMonth = selectedMonth.add(1, 'months')
            setSelectedMonth(moment(nextMonth))
            let newWeekends = getWeekends(nextMonth.format('M'), nextMonth.format('YYYY'))
            setSelectedWeekends(newWeekends)
        }
    }

    return (
        <>
            <div className="bg-blackA flex flex-col items-center justify-center">
                <div className="flex bg-blueA py-2 w-full justify-between items-center ">
                    <div className="w-[50px] ml-[5vw]"></div>
                    <div className="mx-4 text-3xl">{selectedMonth.format('MMMM')}</div>
                    <Image className="rounded-lg  hover:scale-125 rotate-[-90deg] mr-[5vw] transition-all ease-in-out duration-500 cursor-pointer"
                        src="/rightArrowWhite.png"
                        width={50}
                        height={50}
                        alt="NextPic"
                        onClick={(e) => hideBar(e, dateTimeBar.current)}
                    />
                </div>
                <div ref={dateTimeBar} className="overflow-hidden transition-height ease-in-out duration-500">
                    <div className="flex items-center">
                        <Image className="rounded-lg  hover:scale-125 transition-all ease-in-out duration-500 cursor-pointer"
                            src="/leftArrowWhite.png"
                            width={50}
                            height={50}
                            alt="NextPic"
                            onClick={() => prevMonth()}
                        />
                        <div className="grid grid-cols-dateTime grid-rows-2 gap-y-1 px-20 py-8 place-items-center">
                            <div className="text-xl row-start-1 col-start-1">Saturday</div>
                            <div className="text-xl row-start-2 col-start-1">Sunday</div>
                            {selectedWeekends.map((weekend) => {
                                return (
                                    <div key={weekend.day} onClick={() => setSelectedDay(weekend)}
                                        className={`${selectedDay.day === weekend.day ? 'bg-blue-500' : 'bg-white/15 hover:bg-white/30'} transition-all ease-in-out duration-250
                                        row-start-${weekend.which} flex items-center justify-center 
                                        my-4 rounded-[12px] Tablet:w-[70px] Tablet:h-[70px] hover:scale-110 hover:font-bold  cursor-pointer`}>
                                        {weekend.day}</div>
                                )
                            })}
                        </div>
                        <Image className="rounded-lg hover:scale-125 transition-all ease-in-out duration-500"
                            src="/rightArrowWhite.png"
                            width={50}
                            height={50}
                            alt="NextPic"
                            onClick={() => nextMonth()}
                        />
                    </div>
                    <div className="bg-white w-full border-[1px] rounded-3xl"></div>
                    <div className={`${selectedDay === "" ? 'invisible' : 'visibile'} flex justify-center gap-6 Tablet:gap-12 py-6`}>
                        {timeOptions}
                    </div>
                </div>
            </div>
        </>
    )
}