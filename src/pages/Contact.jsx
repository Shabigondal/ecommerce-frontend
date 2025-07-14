import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('📨 Message sent successfully!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-6 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact <span className="text-indigo-600">Us</span></h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a question or just want to say hi? We'd love to hear from you!
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Left - Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-2xl text-indigo-600" />
              <div>
                <h3 className="text-lg font-semibold">Address</h3>
                <p className="text-gray-600 dark:text-gray-300">Fazaia Housing Scheme, Lahore, Pakistan</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-2xl text-indigo-600" />
              <div>
                <h3 className="text-lg font-semibold">Phone</h3>
                <p className="text-gray-600 dark:text-gray-300">+92 300 1234567</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaEnvelope className="text-2xl text-indigo-600" />
              <div>
                <h3 className="text-lg font-semibold">Email</h3>
                <p className="text-gray-600 dark:text-gray-300">support@yourstore.com</p>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-md space-y-6"
          >
            <div>
              <label className="block mb-1 font-medium">Your Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Your Message</label>
              <textarea
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:text-white"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
            >
              ✉️ Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
