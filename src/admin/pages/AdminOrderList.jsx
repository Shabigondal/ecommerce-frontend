// src/admin/pages/AdminOrderList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSync } from 'react-icons/fa';

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const fetchOrders = async () => {
    try {
      const res = await axios.get('https://ab7dae03-a654-4f5e-b84e-6b7924e2581c-00-etotsp6h5au4.sisko.replit.dev/api/admin/orders');
      setOrders(res.data);
    } catch {
      console.error('Failed to load orders');
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`https://ab7dae03-a654-4f5e-b84e-6b7924e2581c-00-etotsp6h5au4.sisko.replit.dev/api/admin/orders/${id}`, { status: newStatus });
      fetchOrders();
    } catch {
      alert('Failed to update status');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.user?.name?.toLowerCase().includes(search.toLowerCase()) || order._id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? order.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="p-6 max-w-6xl mx-auto dark:bg-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">📦 Orders</h2>

      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by customer or order ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full md:max-w-sm dark:bg-gray-800 dark:text-white"
        />
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-3 py-2 rounded w-full md:w-48 dark:bg-gray-800 dark:text-white"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800 text-left">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Total</th>
              <th className="p-3">Paid</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map(order => (
              <tr key={order._id} className="border-b dark:border-gray-700">
                <td className="p-3">{order._id.slice(0, 8)}...</td>
                <td className="p-3">{order.user?.name || 'Unknown'}</td>
                <td className="p-3">PKR{order.totalAmount}</td>
                <td className="p-3">{order.isPaid ? '✅ Paid' : '❌ Not Paid'}</td>
                <td className="p-3">{order.status}</td>
                <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-3">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="border px-2 py-1 rounded bg-white dark:bg-gray-800 dark:text-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center items-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderList;
