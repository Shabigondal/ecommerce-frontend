import React from 'react';

const NewsletterSignup = () => {
  return (
    <section className="bg-indigo-600 dark:bg-gray-900 text-white py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="mb-6 text-lg">Get updates on new arrivals, discounts, and more.</p>
        <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-2/3 px-4 py-3 rounded text-gray-800"
            required
          />
          <button
            type="submit"
            className="bg-white dark:text-black text-indigo-600 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSignup;
