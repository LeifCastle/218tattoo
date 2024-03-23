import { useState, useEffect } from "react"


export default function ListView({ bookings }) {

    const [viewPort, setViewport] = useState('list')

    return (
        <div className="bg-white rounded-md text-black flex flex-col items-center">
            <p className="text-4xl text-center">Confirmed Bookings</p>
            {/* Need to convert the Booking Data into a sorted by date list */}
            <div className="grid grid-cols-listView auto-rows gap-y-1 py-8 place-items-center">
                <div className="text-xl row-start-1 col-start-1">Name</div>
                <div className="text-xl row-start-1 col-start-2">Date</div>
                <div className="text-xl row-start-1 col-start-3">Time</div>
                <div className="text-xl row-start-1 col-start-4">Session</div>
                {bookings.map(booking => {
                    return (
                        <div key={booking.date} className="col-span-4 grid grid-cols-listView gap-y-1 text-center hover:bg-blackA/50 rounded-md">
                            <p className="bg-blackA/10">{booking.name}</p>
                            <p className="bg-blackA/10">{booking.date}</p>
                            <p className="bg-blackA/10">{booking.time}</p>
                            <p className="bg-blackA/10">{booking.session}</p>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

// {selectedWeekends.map((weekend) => {
//     return (
//         <div key={weekend.day} onClick={() => setSelectedDay(weekend)}
//             className={`${selectedDay.day === weekend.day ? 'bg-blue-500' : 'bg-white/15 hover:bg-white/30'} transition-all ease-in-out duration-250
//                         col-start-${weekend.weekendCount} row-start-${weekend.which} flex items-center justify-center
//                         my-4 rounded-[12px] Tablet:w-[70px] Tablet:h-[70px] hover:scale-110 hover:font-bold`}>
//             {weekend.day}</div>
//     )
// })}