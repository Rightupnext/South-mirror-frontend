import { useState } from 'react';
import axios from 'axios';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  const handleSubscribe = async () => {
    if (!email) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${BASE_URL}/subscribe`, { email });
      setMessage('Subscribed successfully! 🎉');
      setEmail('');
    } catch (error) {
      setMessage('Subscription failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-10 bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Stay Updated!</h2>
        <p className="text-gray-600 mb-6">Subscribe to our newsletter for the latest updates.</p>

        <div className="relative mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full py-3 px-4 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
        </div>

        <button
          onClick={handleSubscribe}
          disabled={isSubmitting}
          className="w-full py-3 rounded-full bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
        </button>

        {message && (
          <p
            className={`mt-4 text-sm font-semibold ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
