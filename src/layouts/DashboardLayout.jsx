import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaBars, FaUser, FaBoxOpen, FaMapMarkerAlt, FaEdit, FaTachometerAlt } from 'react-icons/fa';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? 'bg-indigo-100 text-indigo-700 font-semibold rounded px-3 py-2 flex items-center space-x-2' : 'text-gray-700 dark:text-white px-3 py-2 flex items-center space-x-2';

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-3 shadow">
        <h2 className="text-xl font-bold text-indigo-600 dark:text-white">My Account</h2>
        <FaBars className="text-2xl text-gray-700 dark:text-white cursor-pointer" onClick={toggleSidebar} />
      </div>

      {/* Sidebar */}
      <aside className={`md:w-64 bg-white dark:bg-gray-900 shadow-md p-4 space-y-4 md:block ${sidebarOpen ? 'block' : 'hidden'}`}>
        <h2 className="text-2xl font-bold mb-4 dark:text-white hidden md:block">My Account</h2>
        <nav className="flex flex-col space-y-2">
          <NavLink to="/dashboard" end className={navLinkClass}>
            <FaTachometerAlt /><span>Overview</span>
          </NavLink>
          <NavLink to="/dashboard/profile" className={navLinkClass}>
            <FaUser /><span>Profile</span>
          </NavLink>
          <NavLink to="/dashboard/orders" className={navLinkClass}>
            <FaBoxOpen /><span>Orders</span>
          </NavLink>
          <NavLink to="/dashboard/addresses" className={navLinkClass}>
            <FaMapMarkerAlt /><span>Addresses</span>
          </NavLink>
          <NavLink to="/dashboard/edit-account" className={navLinkClass}>
            <FaEdit /><span>Edit Account</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
