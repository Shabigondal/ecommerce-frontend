import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';
  const [otp, setOtp] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        email,
        otp,
      });
      toast.success(res.data.message);
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-green-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-2 text-center">🔐 Verify OTP</h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          We’ve sent a code to <span className="font-medium text-blue-600">{email}</span>
        </p>

        <form onSubmit={handleVerify} className="space-y-5">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition"
          >
            ✅ Verify
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={async () => {
                try {
                  const res = await axios.post('http://localhost:5000/api/auth/resend-otp', { email });
                  toast.success(res.data.message);
                } catch (err) {
                  toast.error(err.response?.data?.message || 'Failed to resend OTP');
                }
              }}
              className="text-sm text-blue-600 hover:underline transition"
            >
              🔄 Resend OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
