import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const result = await stripe.createToken(cardElement);

        if (result.error) {
            setError(result.error.message);
        } else {
            const response = await fetch('/api/payment/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: 1000, currency: 'usd' })
            });

            const paymentIntent = await response.json();
            if (paymentIntent.error) {
                setError(paymentIntent.error.message);
            } else {
                setPaymentSuccess(true);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>Pay</button>
            {error && <div>{error}</div>}
            {paymentSuccess && <div>Payment Successful!</div>}
        </form>
    );
};

export default CheckoutForm;
