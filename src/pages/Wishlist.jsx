// src/pages/Wishlist.jsx
import React, { useContext } from 'react';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

 const handleMoveToCart = (product) => {
  const token = localStorage.getItem('token');

  if (!token) {
    toast.error("Please login to add item to cart");
    return setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  }

  addToCart(product, 1);
  removeFromWishlist(product._id);
  toast.success("Moved to Cart");
};


  return (
     <div className="w-full bg-white dark:bg-black py-10">
  <div className="max-w-5xl mx-auto px-4 py-16 dark:bg-gray-900">
    <h2 className="text-3xl font-bold mb-8 dark:text-white">Your Wishlist</h2>
    {wishlistItems.length === 0 ? (
      <p className="dark:text-white">Your wishlist is empty.</p>
    ) : (
      <ul className="space-y-4">
        {wishlistItems.map((item) => (
          <li
            key={item._id}
            className="border p-4 rounded-md shadow-sm bg-white dark:bg-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div className="flex-1">
              <h3 className="text-xl font-semibold dark:text-white">{item.name}</h3>
              <p className="text-gray-600 dark:text-white">PKR{item.price}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleMoveToCart(item)}
                  className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  Move to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
            <img
              src={`https://ab7dae03-a654-4f5e-b84e-6b7924e2581c-00-etotsp6h5au4.sisko.replit.dev/images/${item.image}`}
              alt={item.name}
              className="w-full md:w-24 h-40 md:h-24 object-cover rounded border"
            />
          </li>
        ))}
      </ul>
    )}
  </div>
</div>

  );
};

export default Wishlist;
