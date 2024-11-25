import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Logo from './components/common/Logo';
import Footer from './components/common/Footer';
import Login from './pages/common/Login';
import Signup from './pages/common/Signup';
import ForgotPassword from './pages/common/ForgotPassword';
import BuyerSellerChoice from './pages/common/BuyerSellerChoice';
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import SellerDashboard from './pages/seller/SellerDashboard';
import BuyerProfile from './pages/buyer/BuyerProfile';
import SellerProfile from './pages/seller/SellerProfile';
import NavbarComponent from './components/common/NavbarComponent';
import BuyerHeader from './components/buyer/BuyerHeader';
import SellerHeader from './components/seller/SellerHeader';
import './App.css';

function App() {
  const Layout = ({ children }) => {
    const location = useLocation();

    // Define routes where the navbar should be shown
    const showNavbar = [
      '/buyer-dashboard', 
      '/seller-dashboard', 
      '/buyer-profile', 
      '/seller-profile'
    ].includes(location.pathname);

    // Header routes where the logo should be shown (common pages like login, signup, etc.)
    const headerRoutes = ['/login', '/signup', '/choose-role', '/', '/forgot-password'];
    const showLogo = headerRoutes.includes(location.pathname);

    // Only show BuyerHeader or SellerHeader on the dashboard pages, not the profile pages
    const showBuyerHeader = location.pathname.startsWith('/buyer-dashboard');
    const showSellerHeader = location.pathname.startsWith('/seller-dashboard');

    return (
      <>
        {showNavbar && <NavbarComponent />} {/* Show Navbar on dashboard and profile pages */}
        {showLogo && <Logo />} {/* Show Logo only on certain pages */}
        
        {/* Show BuyerHeader only on the buyer dashboard */}
        {showBuyerHeader && (
          <div className="d-flex">
            <BuyerHeader />
            <div className="flex-grow-1">{children}</div>
          </div>
        )}
        
        {/* Show SellerHeader only on the seller dashboard */}
        {showSellerHeader && (
          <div className="d-flex">
            <SellerHeader />
            <div className="flex-grow-1">{children}</div>
          </div>
        )}

        {/* If no specific header is needed, simply render children */}
        {!showBuyerHeader && !showSellerHeader && <div className="flex-grow-1">{children}</div>}
      </>
    );
  };

  return (
    <Router>
      <div className="app d-flex flex-column min-vh-100">
        <Layout>
          <Routes>
            {/* Common Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/choose-role" element={<BuyerSellerChoice />} />
            <Route path="/" element={<Login />} />
            

            {/* Buyer Routes */}
            <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
            <Route path="/buyer-profile" element={<BuyerProfile />} />

            {/* Seller Routes */}
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/seller-profile" element={<SellerProfile />} />
          </Routes>
        </Layout>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

