import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';
import { toast } from 'react-toastify';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ProductCard = ({ _id, name, image, price }) => {
  const { wishlistItems = [], addToWishlist, removeFromWishlist } = useContext(WishlistContext) || {};

  const isWishlisted = wishlistItems.some((item) => item._id === _id);
  const product = { _id, name, image, price };

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(_id);
      toast.error('Removed from Wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to Wishlist');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden hover:shadow-xl transition cursor-pointer relative">
      <Link to={`/product/${_id}`}>
        <img src={`http://localhost:5000/images/${product.image}`} alt={name} className="w-full h-52 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{name}</h3>
          <p className="text-indigo-600 font-bold text-lg">PKR{price}</p>
          <button className="mt-3 bg-indigo-600 dark:bg-gray-800 text-white px-4 py-1.5 rounded hover:bg-indigo-700 w-full transition">
            View Details
          </button>
        </div>
      </Link>

      <button onClick={toggleWishlist} className="absolute top-2 right-2">
        {isWishlisted ? (
          <FaHeart className="text-red-500 text-lg hover:scale-110 transition" />
        ) : (
          <FaRegHeart className="text-gray-400 text-lg hover:scale-110 transition" />
        )}
      </button>
    </div>
  );
};

export default ProductCard;
