import React, { useState, useContext } from 'react';
import { FaShoppingCart, FaHeart, FaBars } from 'react-icons/fa';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const { cart } = useContext(CartContext) || {};
  const cartCount = cart?.length || 0;

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
  <nav className="bg-white dark:bg-gray-900 dark:text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-white">ShopEase</h1>
        </Link>

        <ul className="hidden md:flex space-x-6 items-center text-gray-700 font-medium dark:text-white">
          <li><Link to="/" className="hover:text-indigo-600">Home</Link></li>

         <li
  className="relative"
  onMouseEnter={() => setDropdownOpen(true)}
  onMouseLeave={() => setDropdownOpen(false)}
>
  <button className="hover:text-indigo-600">Products ▼</button>
  {dropdownOpen && (
    <ul className="absolute top-full left-0 mt-1 bg-white dark:bg-black shadow-md rounded-md py-2 px-4 space-y-2 z-10 min-w-[160px]">
      <li>
        <NavLink
          to="/products/watches"
          className={({ isActive }) =>
            isActive ? 'text-indigo-600 font-semibold' : 'text-gray-700 dark:text-white'
          }
        >
          Watches
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/products/perfumes"
          className={({ isActive }) =>
            isActive ? 'text-indigo-600 font-semibold' : 'text-gray-700 dark:text-white'
          }
        >
          Perfumes
        </NavLink>
      </li>
    </ul>
  )}
</li>


          <li><Link to="/about" className="hover:text-indigo-600">About</Link></li>
          <li><Link to="/contact" className="hover:text-indigo-600">Contact</Link></li>

          <li>
            <Link to="/wishlist">
              <FaHeart className="text-xl text-red-500 hover:scale-110 transition cursor-pointer" title="Wishlist" />
            </Link>
          </li>

         <li className="relative w-6 h-6">
  <Link to="/cart">
    <FaShoppingCart className="text-xl text-indigo-600 hover:scale-110 transition w-full h-full" title="Cart" />
    {cartCount > 0 && (
      <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
        {cartCount}
      </span>
    )}
  </Link>
</li>


          <li>
            {user ? (
              <>
                      <button
                     onClick={() => {
                     if (user.role === 'admin') {
                     navigate('/admin');
                     } else {
                    navigate('/dashboard');
                     }
                  }}
                className="text-indigo-700 font-semibold hover:underline"
            >
             {user.name}
              </button>

                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 ml-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="bg-indigo-600 text-white px-4 py-1.5 rounded hover:bg-indigo-700"
              >
                Login
              </button>
            )}
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile menu icon */}
        <div className="md:hidden flex items-center space-x-4">
          <Link to="/wishlist">
          <FaHeart className="text-xl text-red-500" />
          </Link>

<li className="relative w-6 h-6 list-none">
  <Link to="/cart">
    <FaShoppingCart className="text-xl text-indigo-600 hover:scale-110 transition w-full h-full" title="Cart" />
    {cartCount > 0 && (
      <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
        {cartCount}
      </span>
    )}
  </Link>
</li>







          <ThemeToggle />
          <FaBars
            className="text-2xl text-gray-700 dark:text-white cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="space-y-3 font-medium text-gray-700 dark:text-white">
            <li><Link to="/" className="block hover:text-indigo-600">Home</Link></li>
            <li><Link to="/products/watches" className="block hover:text-indigo-600">Watches</Link></li>
            <li><Link to="/products/perfumes" className="block hover:text-indigo-600">Perfumes</Link></li>
            <li><Link to="/about" className="block hover:text-indigo-600">About</Link></li>
            <li><Link to="/contact" className="block hover:text-indigo-600">Contact</Link></li>
            <li>
              {user ? (
                <>
                  
                   <button
                     onClick={() => {
                     if (user.role === 'admin') {
                     navigate('/admin');
                     } else {
                    navigate('/dashboard');
                     }
                  }}
                className="text-indigo-700 font-semibold hover:underline"
            >
             {user.name}
              </button>





                  <button onClick={handleLogout} className="text-left text-red-600 hover:underline">Logout</button>
                </>
              ) : (
                <button onClick={() => navigate('/login')} className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">Login</button>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
