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

    let SaturdayTimes = ["8:00am", "10:00am", "12:00pm", "2:00pm"]
    let SundayTimes = ["8:00am", "10:00am", "12:00pm", "2:00pm"]

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
            const selectedDateTimeMoment = moment(selectedDateTimeString, "YYYY-M-D h:mma");
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
            let disabled = false
            // if (moment().add('1', 'hours').format('hh:mma') > time) { If you want to allow same day bookings
            //     disabled = true
            // }
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
                    className={`
                        ${bookedDateTimes[bookedDate]?.includes(time) ? 'bg-black/10 pointer-events-none text-black/40' : selectedTime === time ? 'bg-teal-600 text-white' : 'bg-black/30 hover:bg-black/40'} 
                        ${disabled ? 'bg-black/10 pointer-events-none text-black/40' : 'hover:cursor-pointer text-black'}
                        text-xl rounded-[12px] p-2
                    `}>{time}
                </div>
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
                    const timeFormatted = moment(dateTime.dateTime).format('h:mma');
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
            if (date.day() === 6) {
                let disabled = false; //Improve this its repetetive and silly
                date.format('MMDD') > moment().format('MMDD') ? disabled = false : disabled = true
                weekends.push({ day: date.format('D'), which: 1, disabled }) // Saturday (row 1)
                weekendCount++
            } else if (date.day() === 0) {
                if (weekendCount === 2) { //Accounts for weekends split over the month **need to add a greyed out value to object as well or turn into a placeholder value
                    let disabled = false;
                    date.format('MMDD') > moment().format('MMDD') ? disabled = false : disabled = true
                    weekends.push({ day: date.clone().subtract(1, 'days').format('M-D'), which: 1, disabled })
                    weekendCount++
                }
                let disabled = false;
                date.format('MMDD') > moment().format('MMDD') ? disabled = false : disabled = true
                weekends.push({ day: date.format('D'), which: 2, disabled }) //Sunday (row 2)
            }
            date.add(1, 'days')
        }
        weekends.length <= 8 ? dynamicColumns = 4 : dynamicColumns = 5;
        return weekends;
    }

    function prevMonth() {
        const minDate = moment();
        console.log(`Selected month: ${selectedMonth.format('YYYY-MM-DD')} vs Min date: ${minDate.format('YYYY-MM-DD')}`);
        if (selectedMonth.isAfter(minDate, 'month')) {
            console.log('Going to previous month');
            const prevMonth = selectedMonth.clone().subtract(1, 'months');
            setSelectedMonth(prevMonth);
            const newWeekends = getWeekends(prevMonth.format('M'), prevMonth.format('YYYY'));
            setSelectedWeekends(newWeekends);
            setBoundary('');
            if (!prevMonth.isAfter(minDate, 'month')) {
                setBoundary('start');
            }
        }
    }

    function nextMonth() {
        const maxDate = moment().add(6, 'months');
        if (selectedMonth.isBefore(maxDate, 'month')) {
            const nextMonth = selectedMonth.clone().add(1, 'months');
            setSelectedMonth(nextMonth);
            const newWeekends = getWeekends(nextMonth.format('M'), nextMonth.format('YYYY'));
            setSelectedWeekends(newWeekends);
            setBoundary('');
            if (!nextMonth.isBefore(maxDate, 'month')) {
                setBoundary('end');
            }
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <div ref={dateTimeBar} className="overflow-y-hidden transition-height ease-in-out duration-500">
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center justify-center mt-8">
                            <Image className={`rounded-lg Tablet:hover:scale-125 transition-transform ease-in-out duration-500 cursor-pointer ${boundary === 'start' ? 'invisible' : 'visible'}`}
                                src="/leftArrow.png"
                                width={30}
                                height={30}
                                alt="NextPic"
                                onClick={() => prevMonth()}
                            />
                            <p className="text-3xl text-black mx-10">{selectedMonth.format('MMMM')}</p>
                            <Image className={`rounded-lg Tablet:hover:scale-125 transition-transform ease-in-out duration-500 cursor-pointer ${boundary === 'end' ? 'invisible' : 'visible'}`}
                                src="/rightArrow.png"
                                width={30}
                                height={30}
                                alt="NextPic"
                                onClick={() => nextMonth()}
                            />
                        </div>
                        <div className={`grid grid-cols-[80px_repeat(${dynamicColumns}, minmax(10px, 100px))] grid-rows-2 gap-x-2 gap-y-2 Mobile-M:gap-x-3 Mobile-M:gap-y-3 Tablet:gap-x-6 Tablet:gap-y-6 Tablet:text-xl px-4 Mobile-M:px-6 Tablet:px-10 py-8 place-items-center`}>
                            <div className="hidden Mobile-L:block Mobile-L:text-md Tablet:text-xl row-start-1 col-start-1 text-black">Saturday</div>
                            <div className="hidden Mobile-L:block Mobile-L:text-md Tablet:text-xl row-start-2 col-start-1 text-black">Sunday</div>
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
                                        className={`
                                            ${selectedDay.day === weekend.day ? 'bg-teal-600 text-white' : 'bg-black/30 text-black hover:bg-black/40'} 
                                            ${weekend.disabled ? 'bg-black/10 pointer-events-none text-black/40' : 'hover:scale-110 hover:cursor-pointer'}
                                            text-4xl transition-all ease-in-out duration-250 row-start-${weekend.which} flex items-center justify-center 
                                            rounded-[12px] w-[50px] h-[50px] Tablet:w-[80px] Tablet:h-[80px] 
                                        `}>{weekend.day}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={`${selectedDay === '' ? 'hidden' : 'block'} flex flex-wrap justify-center gap-6 Tablet:gap-12 py-6 overflow-hidden`}>
                        {timeOptions}
                    </div>
                </div>
            </div>
        </>
    )
}
