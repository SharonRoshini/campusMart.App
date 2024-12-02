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

const Layout = ({ children }) => {
  const location = useLocation();

  // Determine visibility of various components
  const showNavbar = ['/buyer-dashboard', '/seller-dashboard', '/product', '/buyer-profile', '/seller-profile'].some(
    (route) => location.pathname.startsWith(route)
  );

  const dashboardAndProfileRoutes = [
    '/buyer-dashboard',
    '/seller-dashboard',
    '/buyer-profile',
    '/seller-profile',
  ];

  // Display the logo unless the current page is a dashboard or profile page
  const showLogo = !dashboardAndProfileRoutes.some((route) => location.pathname.startsWith(route)) ||
    location.pathname === '/choose-role';

  return (
    <>
      {showNavbar && <NavbarComponent />}
      {showLogo && (
        <Logo
          style={{
            cursor: ['/', '/login', '/signup', '/choose-role'].includes(location.pathname) ? 'default' : 'pointer',
          }}
        />
      )}
      {location.pathname.startsWith('/buyer-dashboard') && (
        <div className="d-flex">
          <BuyerHeader />
          <div className="flex-grow-1">{children}</div>
        </div>
      )}
      {location.pathname.startsWith('/seller-dashboard') && (
        <div className="d-flex">
          <SellerHeader />
          <div className="flex-grow-1">{children}</div>
        </div>
      )}
      {!location.pathname.startsWith('/buyer-dashboard') &&
        !location.pathname.startsWith('/seller-dashboard') && <div className="flex-grow-1">{children}</div>}
    </>
  );
};

function App() {
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
