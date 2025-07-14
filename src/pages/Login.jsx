import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [verifyPrompt, setVerifyPrompt] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://ab7dae03-a654-4f5e-b84e-6b7924e2581c-00-etotsp6h5au4.sisko.replit.dev/api/auth/login', formData);
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      login(user);

      if (user.role === "admin") {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }

    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed';

      if (errorMsg === 'Please verify your email first') {
        setVerifyPrompt(true);
        toast.warn(errorMsg);
      } else {
        toast.error(errorMsg);
      }
    }
  };

  const resendOTP = async () => {
    try {
      await axios.post('https://ab7dae03-a654-4f5e-b84e-6b7924e2581c-00-etotsp6h5au4.sisko.replit.dev/api/auth/resend-otp', {
        email: formData.email,
      });
      toast.success('OTP sent again');
      navigate('/verify', { state: { email: formData.email } });
    } catch (err) {
      toast.error('Failed to resend OTP');
    }
  };

  return (
    <div className="py-10 flex items-center justify-center dark:bg-gray-900 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="bg-white/30 dark:bg-white/10 backdrop-blur-lg shadow-xl rounded-xl p-8 w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaEnvelope className="absolute top-3.5 left-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 rounded-md bg-white/70 dark:bg-gray-700 dark:text-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute top-3.5 left-3 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 rounded-md bg-white/70 dark:bg-gray-700 dark:text-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            Login
          </button>

          {verifyPrompt && (
            <button
              type="button"
              onClick={resendOTP}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-md transition duration-300 mt-2"
            >
              Verify Your Email
            </button>
          )}
        </form>
        <p className="text-center text-sm text-white mt-4">
          Don't have an account?{' '}
          <span
            className="underline cursor-pointer hover:text-indigo-200"
            onClick={() => navigate('/register')}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
