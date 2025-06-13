import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) return; // Stripe.js hasn't loaded yet.

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentIntent } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: 'Property Buyer',
        },
      });

      if (error) {
        setError(error.message);
      } else {
        // Optionally handle success, e.g., show confirmation message
        setSuccess(true);
        console.log(paymentIntent);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {success ? (
        <div>
          <h2>Payment Successful!</h2>
          <p>Thank you for your property purchase.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Payment Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </label>
          
          <label>
            Card Details:
            <CardElement />
          </label>

          {error && <div style={{ color: 'red' }}>{error}</div>}

          <button type="submit" disabled={!stripe}>
            Pay ${amount}
          </button>
        </form>
      )}
    </div>
  );
}

export default Payment;
