import React from 'react';
import { FaShippingFast, FaHeadset, FaLock, FaMedal, FaRedo, FaTags, FaShoppingBag, FaStar } from 'react-icons/fa';

const features = [
  { icon: <FaShippingFast />, title: 'Free Delivery' },
  { icon: <FaHeadset />, title: '24/7 Support' },
  { icon: <FaLock />, title: 'Secure Payment' },
  { icon: <FaStar />, title: 'Top Quality' },
  { icon: <FaRedo />, title: 'Easy Returns' },
  { icon: <FaMedal />, title: 'Trusted Brands' },
  { icon: <FaShoppingBag />, title: 'Variety of Products' },
  { icon: <FaTags />, title: 'Best Offers' },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Why Shop With Us?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded shadow hover:shadow-md transition">
              <div className="text-indigo-600 dark:text-white text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-white">{feature.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
