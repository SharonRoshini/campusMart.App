import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation, useLocation } from 'react-router-dom';
import Logo from './components/common/Logo';
import Footer from './components/common/Footer';
import Login from './pages/common/Login';
import Signup from './pages/common/Signup';
import ForgotPassword from './pages/common/ForgotPassword';
import BuyerSellerChoice from './pages/common/BuyerSellerChoice';
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import SellerDashboard from './pages/seller/SellerDashboard';
import NavbarComponent from './components/common/NavbarComponent';
import BuyerHeader from './components/buyer/BuyerHeader'; // Import BuyerHeader
import './App.css';

function App() {
  const Layout = ({ children }) => {
    const location = useLocation();

    // Show the navbar on dashboard pages
    const showNavbar = location.pathname === '/buyer-dashboard' || location.pathname === '/seller-dashboard';

    // Show the header on login, signup, and choose-role pages
    const headerRoutes = ['/login', '/signup', '/choose-role', '/', '/forgot-password'];
    const showHeader = headerRoutes.includes(location.pathname);

    return (
      <>
        {showNavbar && <NavbarComponent />}
        {showHeader && <Logo />}
        {children}
      </>
    );
  };

  return (
    <div className="app d-flex flex-column min-vh-100">
      <Logo />
      {/* Conditionally render BuyerHeader only on the /buyer-dashboard route */}
      {location.pathname === '/buyer-dashboard' && <BuyerHeader />}

      {/* Main Content */}
      <div className="flex-grow-1">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/choose-role" element={<BuyerSellerChoice />} />
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
