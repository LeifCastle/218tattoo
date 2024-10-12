'use client';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export default function StripeOneTimePayment({ payment }) {

    const client = axios.create({
        baseURL: process.env.NEXT_PUBLIC_SERVER_URL
    });

    const sessionId = useRef(null)

    async function handlePayment(price) {
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_TEST_API_KEY.toString());
        initialize();

        //Verify payment success/failure
        async function retrieveSessionDetails(sessionId) {
            try {
                const response = await client.post("/payment/session-status", { sessionId });
                return response.data;
            } catch (error) {
                console.error('Error retrieving session details:', error);
            }
        }

        // Create a Checkout Session
        async function initialize() {
            const fetchClientSecret = async () => {
                try {
                    const response = await client.post("/payment/create-checkout-session", {amount: price*100});
                    console.log('Client Secret:', response.data.clientSecret);
                    console.log('Session Id:', response.data.sessionId);
                    sessionId.current = response.data.sessionId
                    return response.data.clientSecret;
                } catch (error) {
                    console.error("Secret Error:", error);
                }
            };

            // Handles Payment Completion
            const handleComplete = async function () {
                //checkout.destroy()
                const details = await retrieveSessionDetails(sessionId.current);
                console.log('Session details: ', details);
                if (details.status === 'complete') {
                    //remove balance on backend
                }
            }

            const checkout = await stripe.initEmbeddedCheckout({
                fetchClientSecret,
                onComplete: handleComplete,
            });

            // Mount Checkout
            checkout.mount('#checkout');
        }
    }

    useEffect(() => {
        console.log('Payment: ', payment);
        if (payment) {
            handlePayment(payment);
        }
    }, [payment])

    return (
        <div>
            <div id="checkout">
                {/* Checkout will insert the payment form here */}
            </div>
        </div>
    )
}