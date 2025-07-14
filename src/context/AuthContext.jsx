// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { useCart } from './CartContext'; // ✅ Import cart context

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { clearCart } = useCart(); // ✅ use clearCart

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userdata) => {
    setUser(userdata);
    localStorage.setItem('user', JSON.stringify(userdata));
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    clearCart(); // ✅ clear cart on logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
