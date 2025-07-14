import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      alert(res.data.message);
      navigate('/verify', { state: { email: formData.email } }); // 👈 Redirect with email
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg bg-white rounded">
      <form onSubmit={registerUser} className="space-y-4">
        <h2 className="text-xl font-bold">Register</h2>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Register</button>
      </form>
    </div>
  );
};

export default Register;
