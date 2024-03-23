import { useState, useEffect, useRef } from "react"

export default function ListView({ bookings }) {

    const bookingGrid = useRef(null)
    const [viewPort, setViewport] = useState('list')
    const [expanded, setExpanded] = useState(false)

    function expandBooking(id) {
        bookingGrid.current.disabled = true
        bookingGrid.current.background = "#FCFCFC"
        setExpanded(id)
    }

    //change from defining booking by date to id for expandBooking
    return (
        <div className="bg-white rounded-md text-black flex flex-col items-center justify-center">
            <p className="text-4xl text-center">Confirmed Bookings</p>
            {/* Need to convert the Booking Data into a sorted by date list */}
            <div ref={bookingGrid} className="grid grid-cols-listView auto-rows gap-y-1 py-8 place-items-center">
                <div className="text-xl row-start-1 col-start-1">Name</div>
                <div className="text-xl row-start-1 col-start-2">Date</div>
                <div className="text-xl row-start-1 col-start-3">Time</div>
                <div className="text-xl row-start-1 col-start-4">Session</div>
                {bookings.map(booking => {
                    return (
                        <div key={booking.date} onClick={() => expandBooking(booking.date)} className="col-span-4 grid grid-cols-listView gap-y-1 text-center hover:bg-blackA/50 rounded-md">
                            <p className="bg-blackA/10">{booking.name}</p>
                            <p className="bg-blackA/10">{booking.date}</p>
                            <p className="bg-blackA/10">{booking.time}</p>
                            <p className="bg-blackA/10">{booking.session}</p>
                        </div>
                    )
                })}
            </div>
            <div className={`${!expanded ? 'invisible' : 'visible'} absolute top-[50px]`}>
                    <ExpandedBooking expanded={expanded} expandBooking={expandBooking} />
                </div>
        </div>
    )
}

function ExpandedBooking({booking, expandBooking}){
    return(
        <div className="bg-brownA w-[80vw] h-[60vh] rounded-md">
            <div className="w-full h-[34px] bg-blackA text-white text-4xl flex items-center justify-center rounded-tl-md rounded-tr-md"> <p className="mb-2" onClick={() => expandBooking(false)}>-</p> </div>
            <p>{booking}</p>
        </div>
    )
}