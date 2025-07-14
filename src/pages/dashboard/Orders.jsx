import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReviewForm from '../../components/Review';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/order/my-orders', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data);
    } catch (err) {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded dark:bg-black">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Your Orders</h2>

      {loading ? (
        <p className="text-center text-gray-600 dark:text-white">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-white">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border min-w-[600px]">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-900 dark:text-white">
                <th className="px-4 py-2 border">Order ID</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Amount</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <React.Fragment key={order._id}>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-4 py-2 border dark:text-white">{order._id}</td>
                    <td className="px-4 py-2 border dark:text-white">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border dark:text-white">Rs. {order.totalAmount}</td>
                    <td className="px-4 py-2 border">
                      <span
                        className={`px-2 py-1 text-sm rounded font-semibold
                          ${order.status === 'Pending' && 'bg-yellow-100 text-yellow-800'}
                          ${order.status === 'Processing' && 'bg-blue-100 text-blue-800'}
                          ${order.status === 'Shipped' && 'bg-purple-100 text-purple-800'}
                          ${order.status === 'Delivered' && 'bg-green-100 text-green-800'}
                          ${order.status === 'Cancelled' && 'bg-red-100 text-red-800'}
                        `}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>

                  {/* Review Form for Each Product in Delivered Order */}
                  {order.status === 'Delivered' &&
                    Array.isArray(order.products) &&
                    order.products.map((p, index) => (
                      <tr key={`${order._id}-${p.productId}-${index}`}>
                        <td colSpan="4" className="px-4 py-2 border bg-gray-50 dark:bg-gray-900">
                          <ReviewForm
                            productId={p.productId}
                            productName={p.name}
                          />
                        </td>
                      </tr>
                    ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
