import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaFilter } from 'react-icons/fa';
import HeroSection from '../../components/HeroSection';
import ProductCard from '../../components/ProductCard';

const Watches = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [subcategory, setSubcategory] = useState('');

  useEffect(() => {
    axios.get('https://ab7dae03-a654-4f5e-b84e-6b7924e2581c-00-etotsp6h5au4.sisko.replit.dev/api/products/category/watch')
      .then(res => {
        setProducts(res.data);
        setFiltered(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    let updated = [...products];

    if (subcategory) {
      updated = updated.filter(p => p.subcategory?.toLowerCase() === subcategory.toLowerCase());
    }

    if (sortOption === 'lowToHigh') {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'highToLow') {
      updated.sort((a, b) => b.price - a.price);
    }

    setFiltered(updated);
  }, [sortOption, subcategory, products]);

  return (
    <div>
      <HeroSection
        title="Watches Collection"
        subtitle="Discover timeless elegance with our premium watch collection"
        image="/images/watch-main.avif"
      />

      <div className="p-6 max-w-7xl mx-auto dark:bg-gray-900">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold dark:text-white">Available Watches</h2>

        <div className="flex items-center flex-wrap gap-2 sm:gap-4">
  <div className="flex items-center gap-1 sm:gap-2">
    <FaFilter className="text-indigo-600 text-sm sm:text-base" />
    <select
      value={subcategory}
      onChange={(e) => setSubcategory(e.target.value)}
      className="w-24 sm:w-32 border px-2 py-1 rounded text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600"
    >
      <option value="">All</option>
      <option value="Men">Men</option>
      <option value="Women">Women</option>
    </select>
  </div>

  <select
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)}
    className="w-32 sm:w-40 border px-2 py-1 rounded text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600"
  >
    <option value="">Sort by</option>
    <option value="lowToHigh">Price: Low to High</option>
    <option value="highToLow">Price: High to Low</option>
  </select>
</div>

        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.length > 0 ? (
            filtered.map((product) => (
              <ProductCard
                key={product._id}
                _id={product._id}
                name={product.name}
                image={product.image}
                price={product.price}
              />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Watches;
