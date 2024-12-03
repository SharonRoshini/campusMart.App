import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import RequestProduct from './pages/buyer/RequestProduct';
import Verification from './pages/common/Verification';
//import Sidebar from './components/common/Sidebar';
import PersonalInfo from './pages/common/PersonalInfo';
import Wishlist from './pages/buyer/Wishlist';
import Notifications from './pages/common/Notifications';
import './App.css';

const Layout = ({ children }) => {
  const location = useLocation();

  // Define routes where the buyer header should appear
  const isBuyerRoute = location.pathname.startsWith('/buyer-dashboard') ||
    location.pathname === '/buyer-profile';

  // Define routes where the seller header should appear
  const isSellerRoute = location.pathname.startsWith('/seller-dashboard') ||
    location.pathname === '/seller-profile';

  // Define routes with navbar but no header
  const isNavbarOnlyRoute = location.pathname === '/request-product';

  return (
    <>
      {/* Navbar for specific routes */}
      {(isBuyerRoute || isSellerRoute || isNavbarOnlyRoute) && <NavbarComponent />}

      {/* Buyer Header Layout (excluding profile and request product) */}
      {isBuyerRoute && location.pathname !== '/buyer-profile' && (
        <div className="d-flex">
          <BuyerHeader />
          <div className="flex-grow-1">{children}</div>
        </div>
      )}

      {/* Seller Header Layout */}
      {isSellerRoute && (
        <div className="d-flex">
          <SellerHeader />
          <div className="flex-grow-1">{children}</div>
        </div>
      )}

      {/* Default Layout without Header */}
      {!isBuyerRoute && !isSellerRoute && !isNavbarOnlyRoute && (
        <>
          <Logo
            style={{
              cursor: ['/', '/login', '/signup', '/choose-role'].includes(location.pathname)
                ? 'default'
                : 'pointer',
            }}
          />
          <div className="flex-grow-1">{children}</div>
        </>
      )}

      {/* Layout for routes with navbar but no header */}
      {isNavbarOnlyRoute && (
        <div className="flex-grow-1">{children}</div>
      )}

      {/* Layout for buyer profile without header */}
      {location.pathname === '/buyer-profile' && (
        <div className="flex-grow-1">{children}</div>
      )}
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="app d-flex flex-column min-vh-100">
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/choose-role" element={<BuyerSellerChoice />} />
            <Route path="/" element={<Login />} />
            <Route path="/verify" element={<Verification />} />
            <Route path="/personal-info" element={<PersonalInfo />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="*" element={<Navigate to="/personal-info" replace />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
            <Route path="/buyer-profile" element={<BuyerProfile />} />
            <Route path="/request-product" element={<RequestProduct />} />
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
