import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    localStorage.setItem('cartTotal', total);
    localStorage.setItem('cart', JSON.stringify(cart)); 
  }, [cart, total]);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4 bg-white dark:bg-gray-900">
        <FaShoppingCart className="text-6xl text-indigo-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">🔒 Login Required</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
          Please login to view your shopping cart.
        </p>
        <button
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          onClick={() => navigate('/login')}
        >
          🔑 Go to Login
        </button>
      </div>
    );
  }

  return (
     <div className="w-full bg-white dark:bg-gray-900 py-10">
    <div className="max-w-6xl mx-auto px-4 py-16 bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-900 dark:text-white">🛒 Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-300">
          <FaShoppingCart className="text-5xl mx-auto mb-4 text-indigo-400" />
          <p className="text-lg">Your cart is empty. Start adding something!</p>
        </div>
      ) : (
        <>
          <div className="space-y-6">
  {cart.map((item, index) => (
    <div
      key={index}
      className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center md:justify-between gap-4 hover:shadow-lg transition"
    >
      <img
        src={`http://localhost:5000/images/${item.image}`}
        alt={item.name}
        className="w-full md:w-28 h-40 md:h-28 object-cover rounded border"
      />

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{item.name}</h3>
        <p className="text-gray-600 dark:text-gray-300">
          PKR{item.price} × {item.quantity}
        </p>
        <button
          onClick={() => removeFromCart(item._id)}
          className="text-red-600 hover:underline text-sm mt-1 flex items-center gap-1"
        >
          <FaTrash /> Remove
        </button>
      </div>

      <div className="flex items-center gap-2 self-start md:self-center">
        <button
          onClick={() => updateQuantity(item._id, item.quantity - 1)}
          className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white font-semibold"
        >
          −
        </button>
        <span className="text-gray-800 dark:text-white font-medium">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item._id, item.quantity + 1)}
          className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white font-semibold"
        >
          +
        </button>
      </div>
    </div>
  ))}
</div>


          <div className="mt-12 text-right border-t pt-6 border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              Total: <span className="text-indigo-600">PKR{total}</span>
            </h3>
            <button
              className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
              onClick={() => navigate('/Shipping')}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
    </div>
  );
};

export default Cart;
