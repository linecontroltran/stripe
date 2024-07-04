import React from 'react';
import ReactDOM from 'react-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import App from './App';

const stripePromise = loadStripe('your_stripe_public_key');

ReactDOM.render(
    <Elements stripe={stripePromise}>
        <App />
    </Elements>,
    document.getElementById('root')
);
