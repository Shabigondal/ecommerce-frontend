// src/pages/Shipping.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Shipping = () => {
  const [address, setAddress] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    const fetchAddress = async () => {
      try {
        const res = await axios.get('https://ab7dae03-a654-4f5e-b84e-6b7924e2581c-00-etotsp6h5au4.sisko.replit.dev/api/user/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAddress(res.data.address);
      } catch (err) {
        toast.error('Failed to fetch address');
      }
    };

    fetchAddress();
  }, []);

  const handleContinue = () => {
    if (!isLoggedIn) return;

    if (address?.fullName && address?.phone && address?.city && address?.country) {
      navigate('/Payment');
    } else {
      toast.error('Your address is incomplete. Visit your profile to update it.');
    }
  };

  return (
    <div className="px-4 py-8 flex justify-center bg-gradient-to-br from-blue-100 to-green-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          🚚 Shipping Information
        </h2>

        {!isLoggedIn ? (
          <div className="text-center text-red-500 font-semibold text-lg">
            Please login to continue to shipping.
          </div>
        ) : address ? (
          <div className="space-y-2 text-gray-800 dark:text-gray-200">
            <p><strong>Name:</strong> {address.fullName}</p>
            <p><strong>Phone:</strong> {address.phone}</p>
            <p><strong>Street:</strong> {address.street}</p>
            <p><strong>Post Box:</strong> {address.postBox}</p>
            <p><strong>City:</strong> {address.city}</p>
            <p><strong>Postal Code:</strong> {address.postalCode}</p>
            <p><strong>Country:</strong> {address.country}</p>
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading address...</p>
        )}

        <button
          onClick={handleContinue}
          disabled={!isLoggedIn}
          className={`w-full mt-6 ${
            isLoggedIn ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
          } text-white font-semibold py-3 rounded-lg transition`}
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default Shipping;
