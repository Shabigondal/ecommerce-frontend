import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10">
          About <span className="text-indigo-600">Us</span>
        </h1>

        {/* Company Intro */}
        <div className="mb-12 text-center">
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            We are a passionate team of developers and designers bringing you elegant, high-quality products with a touch of modern design and functionality.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-2xl font-semibold mb-3">🎯 Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-300">
              To deliver premium digital products that combine craftsmanship, quality, and technology — making shopping simple and delightful.
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="text-2xl font-semibold mb-3">🚀 Our Vision</h3>
            <p className="text-gray-600 dark:text-gray-300">
              To become a global brand recognized for innovation, trust, and customer satisfaction in every product we offer.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-10">👥 Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow text-center">
              <img
                src="/images/team1.jpg"
                alt="Team Member"
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
              />
              <h4 className="text-xl font-semibold">Sohaib Ahmed</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Founder & Developer</p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow text-center">
              <img
                src="/images/team2.jpg"
                alt="Team Member"
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
              />
              <h4 className="text-xl font-semibold">Ahtisham Raza</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">UI/UX Designer</p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow text-center">
              <img
                src="/images/team3.jpg"
                alt="Team Member"
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
              />
              <h4 className="text-xl font-semibold">Ahmad Imran</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Frontend Engineer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
