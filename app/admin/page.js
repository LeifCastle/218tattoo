"use client"

import axios from 'axios';

export default function Admin() {

    // const BASE_URL =
    // process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

    const client = axios.create({
        baseURL: "http://localhost:5000" 
      });

    function getBookings() {
        client
        .get()
        .then((response) => {
          console.log(response);
        });
    }

    return (
        <main>
            <p>Bookenator</p>
            <button onClick={() => getBookings()}>See Bookings</button>
        </main>
    )
}