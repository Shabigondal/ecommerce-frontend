import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-lg ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      title="Scroll to top"
    >
      <FaArrowUp />
    </button>
  );
};

export default ScrollToTop;
