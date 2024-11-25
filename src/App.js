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
import ProductDetail from './pages/buyer/ProductDetails';
import './App.css';

function App() {
  const Layout = ({ children }) => {
    const location = useLocation();

    const showNavbar = ['/buyer-dashboard', '/seller-dashboard', '/product/:productId', '/buyer-profile', '/seller-profile'].some((route) =>
      location.pathname.startsWith(route.replace(':productId', ''))
    );

    const headerRoutes = ['/login', '/signup', '/choose-role', '/', '/forgot-password'];
    const showLogo = headerRoutes.includes(location.pathname);

    // Show filters and dashboard-related components only on dashboard routes
    const showFilters = location.pathname.startsWith('/buyer-dashboard') || location.pathname.startsWith('/seller-dashboard');

    // Hide Buyer/Seller header on profile pages
    const showBuyerHeader = location.pathname.startsWith('/buyer-dashboard') && !location.pathname.startsWith('/buyer-profile');
    const showSellerHeader = location.pathname.startsWith('/seller-dashboard') && !location.pathname.startsWith('/seller-profile');

    return (
      <>
        {showNavbar && <NavbarComponent />}
        {showLogo && <Logo />}
        {showFilters && <div className="filters"> {/* Your filter component here */} </div>}
        {showBuyerHeader && (
          <div className="d-flex">
            <BuyerHeader />
            <div className="flex-grow-1">{children}</div>
          </div>
        )}
        {showSellerHeader && (
          <div className="d-flex">
            <SellerHeader />
            <div className="flex-grow-1">{children}</div>
          </div>
        )}
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

            {/* Product Detail Route */}
            <Route path="/product/:productId" element={<ProductDetail />} />

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
