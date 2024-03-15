"use client"

import moment from 'moment';
import { useEffect, useState } from 'react';

export default function BookingDateTime() {

    const [selectedMonth, setSelectedMonth] = useState(moment())
    const [selectedWeekends, setSelectedWeekends] = useState([])

    //Set inital month/dates
    useEffect(() => {
        setSelectedMonth(moment())
        setSelectedWeekends(getWeekends(moment().format('M'), moment().format('YYYY')))
    }, [])

    function getWeekends(month, year) {
        const weekends = []
        let date = moment({ year, month: month - 1, day: 1 }); //Subtracting 1 to account for zero indexing of months (.format method is not zero indexed)
        let weekendCount = 1;  //Determines which column the date will be assigned
        for (let i = 0; i <= date.daysInMonth(); i++) {
            if (date.day() === 6) {
                weekends.push({ day: date.format('M-D'), which: 1, weekendCount }) // Saturday (row 1)
                weekendCount++
            } else if (date.day() === 0) {
                if (weekendCount === 1) { //Accounts for weekends split over the month **need to add a greyed out value to object as well or turn into a placeholder value
                    weekends.push({ day: date.clone().subtract(1, 'days').format('M-D'), which: 2, weekendCount })
                    weekendCount++
                }
                weekends.push({ day: date.format('M-D'), which: 2, weekendCount }) //Sunday (row 2)
                weekendCount++
            }
            date.add(1, 'days')
        }
        return weekends;
    }

    //--Advances the calendar to the previous month **need to add something to allow crossover into last year
    function prevMonth() {
        if (selectedMonth.format('M') > moment().format('M')) {
            let prevMonth = selectedMonth.subtract(1, 'months')
            setSelectedMonth(moment(prevMonth))
            setSelectedWeekends(getWeekends(prevMonth.format('M'), prevMonth.format('YYYY')))
        }
    }
    //--Advances the calendar to the next month **need to add something to allow crossover into next year
    function nextMonth() {
        if (selectedMonth.format('M') < moment().add(6, 'months').format('M')) {
            let prevMonth = selectedMonth.add(1, 'months')
            setSelectedMonth(moment(prevMonth))
            let newWeekends = getWeekends(prevMonth.format('M'), prevMonth.format('YYYY'))
            console.log('New Weekends: ', newWeekends)
            setSelectedWeekends(newWeekends)
        }
    }

    return (
        <>
            <div className="bg-blueA my-20 flex flex-col items-center">
                <div className="flex justify-center bg-blackA w-full">
                    <button className="" onClick={() => prevMonth()}>lastMonth</button>
                    <div className="mx-4">{selectedMonth.format('MMMM')}</div>
                    <button className="" onClick={() => nextMonth()}>nextMonth</button>
                </div>
                <div className="grid grid-cols-dateTime grid-rows-2 gap-y-1 px-20">
                    <div className="row-start-1">Satdurday</div>
                    <div className="row-start-2">Sunday</div>
                    {selectedWeekends.map((weekend) => {
                        return (
                            <div className={`col-start-${weekend.weekendCount} row-start-${weekend.which} max-w-[50px] rounded-md`}>{weekend.day}</div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}