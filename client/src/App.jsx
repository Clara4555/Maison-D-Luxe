import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Chefs from './pages/Chefs';
import About from './pages/About';
import Contact from './pages/Contact';
import Reservations from './pages/Reservations';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import Cart from './components/Cart';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Dashboard from '../src/admin/Dashboard/Dashboard';
import MenuManagement from '../src/admin/MenuManagement/MenuManagement';
import UserManagement from '../src/admin/UserManagement/UserManagement';
import OrderManagement from '../src/admin/OrderManagement/OrderManagement';
import Settings from '../src/admin/Settings/Settings';
import Login from '../src/admin/Auth/Login';
import Register from '../src/admin/Auth/Register';
import ProtectedRoute from '../src/admin/Auth/ProtectedRoute';
import AdminLayout from '../src/admin/Layout/Layout';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen bg-primary-50 dark:bg-charcoal-900 transition-colors duration-300 flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <AnimatePresence mode="wait">
                  <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/chefs" element={<Chefs />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/reservations" element={<Reservations />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-confirmation" element={<OrderConfirmation />} />
                    <Route path="/login" element={<UserLogin />} />
                    <Route path="/register" element={<UserRegister />} />

                    {/* Admin auth routes */}
                    <Route path="/admin/login" element={<Login />} />
                    <Route path="/admin/register" element={<Register />} />

                    {/* Protected admin routes */}
                    <Route path="/admin" element={
                      <ProtectedRoute adminOnly={true}>
                        <AdminLayout />
                      </ProtectedRoute>
                    }>
                      <Route index element={<Dashboard />} />
                      <Route path="menu" element={<MenuManagement />} />
                      <Route path="orders" element={<OrderManagement />} />
                      <Route path="users" element={<UserManagement />} />
                      <Route path="settings" element={<Settings />} />
                    </Route>
                  </Routes>
                </AnimatePresence>
              </main>
              <Footer />
              <Cart />
              <BackToTop />
            </div>
          </CartProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;