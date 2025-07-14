import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const EditAccount = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/user/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setForm(prev => ({
          ...prev,
          name: res.data.name,
          email: res.data.email,
        }));
      } catch (err) {
        console.error(err);
        toast.error("Failed to load user info");
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put('http://localhost:5000/api/auth/update-account', {
        name: form.name,
        email: form.email,
        currentPassword: form.currentPassword,
        newPassword: form.newPassword
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });

      toast.success(res.data.message);
      setForm({ ...form, currentPassword: '', newPassword: '' });


       localStorage.removeItem('token');
      setTimeout(() => {
        navigate('/login');
      }, 1000);



    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 bg-gray-100 p-4">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">✏️ Edit Account</h2>

        <form onSubmit={handleUpdate} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium dark:text-white">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none"
              required
            />
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="block mb-1 text-sm font-medium dark:text-white">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              disabled
              className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Current Password */}
          <div>
            <label className="block mb-1 text-sm font-medium dark:text-white">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block mb-1 text-sm font-medium dark:text-white">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded transition duration-300"
          >
            🔒 Update Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAccount;
