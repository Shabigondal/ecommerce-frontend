import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import  CartProvider  from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CartProvider>
      <WishlistProvider>
        <ThemeProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
      </WishlistProvider>
  </CartProvider>
);
