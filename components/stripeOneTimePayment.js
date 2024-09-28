'use client';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

export default function StripeOneTimePayment(priceId, price, description) {

    const client = axios.create({
        baseURL: process.env.NEXT_PUBLIC_SERVER_URL
    });

    async function handlePayment(price) {
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_TEST_API_KEY.toString());
        initialize();
        // Create a Checkout Session
        async function initialize() {
            const fetchClientSecret = async () => {
                try {
                    const response = await client.post("/payment/create-checkout-session", {});
                    console.log('Client Secret:', response.data.clientSecret); 
                    return response.data.clientSecret; 
                } catch (error) {
                    console.error("Secret Error:", error);
                }
            };

            const checkout = await stripe.initEmbeddedCheckout({
                fetchClientSecret,
            });

            // Mount Checkout
            checkout.mount('#checkout');
        }
    }

    return (
        <div>
            <p>What the fuck</p>
            <button onClick={() => handlePayment(100)}>Pay In Full</button>
            <div id="checkout">
                {/* Checkout will insert the payment form here */}
            </div>
        </div>
    )
}