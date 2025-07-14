// import React from 'react';

// const HeroSection = ({ title, image }) => {
//   return (
//     <div
//       className="h-64 bg-cover bg-center flex items-center justify-center text-white text-4xl font-bold"
//       style={{ backgroundImage: `url(${image})` }}
//     >
//       {title}
//     </div>
//   );
// };

// export default HeroSection;


import React from 'react';

const HeroSection = ({ title, subtitle, image }) => {
  return (
    <section className="w-full relative">
      <div className="relative h-[350px] sm:h-[400px] md:h-[500px] lg:h-[550px] xl:h-[600px]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">{title}</h1>
          <p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-xl drop-shadow">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
