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
        for (let i = 0; i <= date.daysInMonth(); i++) {
            if (date.day() === 0 || date.day() === 6) {
                weekends.push(date.format('M-D'))
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
            <div className="grid grid-cols-5 grid-rows-3 gap-y-2 my-20">
                <button className="row-start-1 col-start-2" onClick={() => prevMonth()}>lastMonth</button>
                <div className="row-start-1 col-start-3 text-center">{selectedMonth.format('MMMM')}</div>
                <button className="row-start-1 col-start-4" onClick={() => nextMonth()}>nextMonth</button>
                <div className="row-start-2">Satdurday</div>
                <div className="row-start-3">Sunday</div>
                {selectedWeekends.map((weekend) => {
                    console.log('Weekend: ', weekend)
                    return (
                        <div className="col-start-2 row-start 2">{weekend}</div>
                    )
                })}
            </div>
        </>
    )
}