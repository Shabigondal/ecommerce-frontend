import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Payment = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [shippingFee] = useState(200); // Static shipping fee
  const [cartTotal, setCartTotal] = useState(0); // Total from localStorage
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);


  const totalAmount = cartTotal + shippingFee;

useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) return navigate('/login');

  axios
    .get('https://ab7dae03-a654-4f5e-b84e-6b7924e2581c-00-etotsp6h5au4.sisko.replit.dev/api/user/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setUser(res.data))
    .catch(() => navigate('/login'));

  const localCartTotal = parseInt(localStorage.getItem('cartTotal')) || 0;
  setCartTotal(localCartTotal);

  const storedCart = JSON.parse(localStorage.getItem('cart')) || []; // ✅ this line
  setCart(storedCart); // ✅ this line
}, []);


  const handlePayment = async () => {
    if (!paymentMethod) return toast.error('Please select a payment method');

    if (!user?.address?.fullName) {
      return toast.error('Please complete your shipping address before placing the order.');
    }

    const products = cart.map(item => ({
  productId: item._id,
  name: item.name,
  quantity: item.quantity,
  price: item.price,
}));


    setIsLoading(true);
    try {
      await axios.post(
        'https://ab7dae03-a654-4f5e-b84e-6b7924e2581c-00-etotsp6h5au4.sisko.replit.dev/api/order/create',
        {
          userId: user._id,
          address: user.address,
          paymentMethod,
          shippingFee,
          cartTotal,
          totalAmount,
          products,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // Clear cart from localStorage after order success
      localStorage.removeItem('cart');
      localStorage.removeItem('cartTotal');

      toast.success('✅ Order placed successfully!');
      navigate('/dashboard/orders');
    } catch (err) {
      toast.error('❌ Failed to place order');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="py-10 flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 px-4 py-10">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">🧾 Payment Details</h2>

        {!user.address?.fullName && (
          <div className="text-center text-red-500 font-semibold mb-4">
            ⚠️ Please complete your shipping address before payment.
          </div>
        )}

        <div className="space-y-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300">Shipping Info</h4>
            <p className="text-sm dark:text-white">
              {user.address?.fullName}, {user.address?.street}
            </p>
            <p className="text-sm dark:text-white">{user.address?.phone}</p>
          </div>

          <div>
            <label className="block font-medium dark:text-white mb-2">Select Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border px-4 py-2 rounded dark:bg-gray-700 dark:text-white"
            >
              <option value="">-- Choose --</option>
              <option value="easypaisa">EasyPaisa</option>
              <option value="jazzcash">JazzCash</option>
              <option value="sadapay">SadaPay</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
            <p className="dark:text-white">🛒 Cart Total: <strong>Rs. {cartTotal}</strong></p>
            <p className="dark:text-white">🚚 Shipping Fee: <strong>Rs. {shippingFee}</strong></p>
            <hr className="my-2 border-gray-400" />
            <p className="text-xl font-bold dark:text-white">💳 Total: Rs. {totalAmount}</p>
          </div>

          <button
            disabled={isLoading || !user.address?.fullName}
            onClick={handlePayment}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold transition"
          >
            {isLoading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
