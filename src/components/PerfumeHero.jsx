import React from 'react';
import { useNavigate } from 'react-router-dom';

const PerfumeHero = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      
      {/* Watches Hero */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 py-20 max-w-7xl mx-auto">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">Fragnance That Defines You</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
           Explore our premium range of perfumes for every occasion. Long-lasting, luxurious, and unforgettable.
          </p>
          <button
            onClick={() => navigate('/products/perfumes')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition"
          >
            Explore Perfumes
          </button>
        </div>

        <div className="md:w-1/2 mb-10 md:mb-0">
          <img src="/images/perfume-main.avif" alt="Watches" className="rounded-xl shadow-lg" />
        </div>
      </section>
    </div>
  );
};

export default PerfumeHero;
