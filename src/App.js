import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register';
import VerifyOTP from './pages/VerifyOTP';
import Login from './pages/Login';
import Watches from './pages/category/Watches';
import Perfumes from './pages/category/Perfumes'; 
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import FeaturesSection  from './components/FeatureSections';
import TestimonialSection from './components/TestimonialSection';
import NewsletterSignup from './components/NewsletterSignup';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import ProtectedRoute from './components/ProtectedRoute';
import PerfumeHero from './components/PerfumeHero';
import WatchHero from './components/WatchHero';
import About from './pages/About';
import Contact from './pages/Contact';

//Dashboard layout and page
import DashboardLayout from './layouts/DashboardLayout';
import Overview from './pages/dashboard/Overview';
import Profile from './pages/dashboard/Profile';
import Orders from './pages/dashboard/Orders';
import Addresses from './pages/dashboard/Addresses';
import EditAccount from './pages/dashboard/EditAccount';

//Admin Dashboard layout and page
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import AdminProducts from './admin/pages/AdminProductList';
import AdminUserList from './admin/pages/AdminUserList';
import AdminOrderList from './admin/pages/AdminOrderList';


//ends here

function App() {
  return (
    <Router>
<ToastContainer position="top-right" autoClose={2000} />
      <Navbar />
      <Routes>
        <Route path="/" element={<><Home /><Products /> <PerfumeHero />  <FeaturesSection /> <WatchHero />
      <TestimonialSection />
      <NewsletterSignup /></>} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyOTP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>      
        <Route path="/products/watches" element={<Watches />} />
        <Route path="/products/perfumes" element={<Perfumes />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
       {/* ✅ USER Dashboard (Protected) */}
  <Route path="/dashboard" element={
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  }>
    <Route index element={<Overview />} />
    <Route path="profile" element={<Profile />} />
    <Route path="orders" element={<Orders />} />
    <Route path="addresses" element={<Addresses />} />
    <Route path="edit-account" element={<EditAccount />} />
  </Route>

   {/* Admin Dashboard Routes (Protected ideally) */}
   <Route path="/admin" element={
    <ProtectedRoute adminOnly={true}>
      <AdminLayout />
    </ProtectedRoute>
  }>
    <Route index element={<Dashboard />} />
    <Route path="AdminProductList" element={<AdminProducts />} />
    <Route path="AdminOrderList" element={<AdminOrderList />} />
    <Route path="AdminUserList" element={<AdminUserList />} />
  </Route>
 
      </Routes>
      <Footer />
      <ScrollToTop />
    </Router>
  );
}

export default App;
