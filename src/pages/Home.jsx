import React from 'react';

const Home = () => {
  return (
    <>
      <section
        className="bg-cover bg-center py-20"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      >
        <div className="bg-black bg-opacity-50 max-w-6xl mx-auto px-4 text-center text-white py-16 rounded">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Discover Luxury Watches & Elegant Perfumes
          </h2>
          <p className="text-lg mb-8">
            Handpicked products to define your personality.
          </p>
          <a href="#products">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded text-lg hover:bg-indigo-700 transition">
              Shop Now
            </button>
          </a>
        </div>
      </section>
    </>
  );
};

export default Home;
