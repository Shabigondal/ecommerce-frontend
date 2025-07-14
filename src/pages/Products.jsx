import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { FaFilter } from 'react-icons/fa';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = 'https://ab7dae03-a654-4f5e-b84e-6b7924e2581c-00-etotsp6h5au4.sisko.replit.dev/api/products';
        if (filter !== 'all') {
          url += `/category/${filter}`;
        }
        const res = await axios.get(url);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [filter]);

  return (
    <div className="pt-8 dark:bg-gray-800">
      {/* Filter icon and dropdown */}
      <div className="max-w-7xl mx-auto px-4 mb-6 flex justify-end relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          <FaFilter /> Filter
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-12 bg-white border rounded shadow-md z-10 w-40">
            <button onClick={() => setFilter('all')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              All
            </button>
            <button onClick={() => setFilter('watch')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Watches
            </button>
            <button onClick={() => setFilter('perfume')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Perfumes
            </button>
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((item) => (
              <ProductCard
                key={item._id}
                _id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
