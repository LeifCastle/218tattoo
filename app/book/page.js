import BookingDateTime from "../../components/bookingDateTime"

export default function Book() {
    return (
        <div className="bg-brownA">
            <p>We're glad you decided to book with us, we just have a few questions to get you started</p>
            <p>When would you like to schedule an appt???</p>
            <BookingDateTime />
            <p>Book</p>
            <button>See Bookings</button>
            <div className="flex">
                <button>Tattoo</button>
                <button>Piercing</button>
                <button>Tooth Gem</button>
            </div>
        </div>
    )
}