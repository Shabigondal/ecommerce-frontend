import React from 'react';

const testimonials = [
  {
    name: 'Ayesha Malik',
    message: 'I ordered a perfume and received it within 2 days! Amazing service and quality.',
    image: '/images/user1.jpg',
  },
  {
    name: 'Ali Raza',
    message: 'ShopEase is my go-to for watches. Love the experience every time!',
    image: '/images/user2.jpg',
  },
  {
    name: 'Fatima Shah',
    message: 'Easy checkout, great support, and genuine products. Highly recommended!',
    image: '/images/user3.jpg',
  },
];

const TestimonialSection = () => {
  return (
    <section className="bg-gray-100 py-16 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 dark:text-white">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 p-6 rounded shadow hover:shadow-lg transition"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <p className="text-gray-600 dark:text-white mb-4 italic">"{t.message}"</p>
              <h4 className="text-indigo-600 font-semibold">{t.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
