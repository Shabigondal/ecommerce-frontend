import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaBox, FaShoppingBag, FaUsers, FaTimes } from 'react-icons/fa';

const AdminSidebar = ({ open, setOpen }) => {
  const navItem = (to, label, icon) => (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded transition
        ${isActive ? 'bg-indigo-100 text-indigo-600 dark:bg-gray-700 dark:text-white font-semibold' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`
      }
    >
      {icon} <span>{label}</span>
    </NavLink>
  );

  return (
    <aside className={`
      fixed md:static top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-md z-50 p-4
      transform transition-transform duration-300 md:translate-x-0
      ${open ? 'translate-x-0' : '-translate-x-full'}
    `}>
      {/* Close button for mobile */}
      <div className="md:hidden flex justify-end mb-4">
        <button onClick={() => setOpen(false)} className="text-white text-xl">
          <FaTimes />
        </button>
      </div>

      <h2 className="text-2xl font-bold text-indigo-600 mb-6 hidden md:block">Admin Panel</h2>
      <nav className="space-y-2">
        {navItem('/admin', 'Dashboard', <FaTachometerAlt />)}
        {navItem('/admin/AdminProductList', 'Products', <FaBox />)}
        {navItem('/admin/AdminOrderList', 'Orders', <FaShoppingBag />)}
        {navItem('/admin/AdminUserList', 'Users', <FaUsers />)}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
