import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaShoppingBag, FaMapMarkerAlt, FaEdit, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded hover:bg-indigo-100 transition ${
      isActive ? 'bg-indigo-200 font-semibold' : 'text-gray-700'
    }`;

  return (
    <div className="w-full md:w-64 bg-white dark:bg-gray-900 shadow h-full p-4">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">My Account</h2>
      <nav className="flex flex-col gap-2">
        <NavLink to="/dashboard/profile" className={linkClass}>
          <FaUser /> Profile
        </NavLink>
        <NavLink to="/dashboard/orders" className={linkClass}>
          <FaShoppingBag /> Orders
        </NavLink>
        <NavLink to="/dashboard/addresses" className={linkClass}>
          <FaMapMarkerAlt /> Addresses
        </NavLink>
        <NavLink to="/dashboard/edit-account" className={linkClass}>
          <FaEdit /> Edit Account
        </NavLink>
        <NavLink to="/dashboard/logout" className={linkClass}>
          <FaSignOutAlt /> Logout
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
