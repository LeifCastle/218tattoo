import BookingDateTime from "../../components/bookingDateTime"

export default function Book() {
    return (
        <div className="bg-brownA bg-cover">
            <BookingDateTime />
            <p>Book</p>
            <button>See Bookings</button>
            <div className="flex">
                <button>Tattoo</button>
                <button>Piercing</button>
                <button>Tooth Gem</button>
            </div>
            <div className="h-[40vh]"></div>
        </div>
    )
}