import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to add items to cart');
      return;
    }

    setCart(prevCart => {
      const exists = prevCart.find(item => item._id === product._id);
      if (exists) {
        return prevCart.map(item =>
          item._id === product._id
            ? { ...item, quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item._id !== id));
  };

  const updateQuantity = (id, newQty) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item._id === id
          ? { ...item, quantity: newQty > 0 ? newQty : 1 }
          : item
      )
    );
  };

  // ✅ Clear cart on logout
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cartItems');
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

// ✅ Export the useCart custom hook
export const useCart = () => useContext(CartContext);
