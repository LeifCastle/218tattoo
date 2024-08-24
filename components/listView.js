import { useState, useEffect, useRef } from "react"
import moment from 'moment';

export default function ListView({ bookings}) {

    const bookingGrid = useRef(null)
    const [viewPort, setViewport] = useState('list')
    const [expanded, setExpanded] = useState(false)

    function expandBooking(id) {
        bookingGrid.current.disabled = true
        bookingGrid.current.background = "#FCFCFC"
        setExpanded(id)
    }

    console.log('filteredBookings: ', bookings)
    //filterBookings('current')
    return (
        <div className="bg-white rounded-md text-black flex flex-col items-center justify-center">
            {/* Need to convert the Booking Data into a sorted by date list */}
            <div ref={bookingGrid} className="grid grid-cols-listView auto-rows gap-y-1 py-8 place-items-center">
                <div className="text-xl row-start-1 col-start-1">Name</div>
                <div className="text-xl row-start-1 col-start-2">Date</div>
                <div className="text-xl row-start-1 col-start-3">Time</div>
                <div className="text-xl row-start-1 col-start-4">Session</div>
                {bookings.map(booking => {
                    return (
                        <div key={booking._id} onClick={() => expandBooking(booking.dateTime)} className="col-span-4 grid grid-cols-listView gap-y-1 text-center hover:bg-blackA/50 rounded-md">
                            <p className="bg-blackA/10">{booking?.info?.contact?.firstName}</p>
                            <p className="bg-blackA/10">{moment(booking.dateTime).format('MM/DD')}</p>
                            <p className="bg-blackA/10">{moment(booking.dateTime).format('h:mm A')}</p>
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

function ExpandedBooking({ booking, expandBooking }) {
    return (
        <div key={booking} className="bg-brownA w-[80vw] h-[60vh] rounded-md">
            <div className="w-full h-[34px] bg-blackA text-white text-4xl flex items-center justify-center rounded-tl-md rounded-tr-md">
                <p className="mb-2" onClick={() => expandBooking(false)}>-</p>
            </div>
            <p key={booking}>{booking}</p>
        </div>
    )
}