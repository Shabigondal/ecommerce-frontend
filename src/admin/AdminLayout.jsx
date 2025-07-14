import React, { useState } from 'react';
import AdminSidebar from './components/AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow z-30">
          <button onClick={() => setSidebarOpen(true)} className="text-xl text-gray-700 dark:text-white">
            ☰
          </button>
          <h2 className="text-xl font-semibold text-indigo-600">Admin Panel</h2>
        </div>

        <div className="p-4">
          <Outlet />
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
