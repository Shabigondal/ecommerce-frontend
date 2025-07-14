// src/admin/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/dashboard-stats');
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-white">🧾 Total Orders</h3>
        <p className="text-2xl font-bold text-indigo-600">{stats.orderCount}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-white">📦 Products</h3>
        <p className="text-2xl font-bold text-indigo-600">{stats.productCount}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-white">💵 Sales</h3>
        <p className="text-2xl font-bold text-indigo-600">PKR{stats.totalSales}</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-white">👤 Users</h3>
        <p className="text-2xl font-bold text-indigo-600">{stats.userCount}</p>
      </div>
    </div>
  );
};

export default Dashboard;
