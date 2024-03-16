import BookingDateTime from "../../components/bookingDateTime"

export default function Book() {
    return (
        <div className="bg-homePage bg-cover">
            <div className="bg-brownA py-20">
                <p>We&apos;re glad you decided to book with us, we just have a few questions to get you started</p>
                <p>When would you like to schedule an appt???</p>
            </div>
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