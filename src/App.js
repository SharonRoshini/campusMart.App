import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
import ProductDetail from './pages/buyer/ProductDetails';
import RequestProduct from './pages/buyer/RequestProduct';
import Verification from './pages/common/Verification';
import Notifications from './pages/common/Notifications';
import Wishlist from './pages/common/Wishlist';
import SessionExpired from './pages/common/SessionExpired';

import './App.css';
import UpdatePassword from './pages/common/UpdatePassword';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the current page is the product detail page
  const isProductPage = location.pathname.startsWith("/product/");

  // Define routes where Navbar should be hidden
  const shouldHideNavbar = [
    "/login",
    "/signup",
    "/forgot-password",
    "/choose-role",
    "/session-expired",
  ].includes(location.pathname);

  // Define routes where Logo should be hidden
  const shouldHideLogo = [
    "/request-product",
    "/profile",
    "/wishlist",
    "/notifications",
    "/seller-dashboard"
  ].includes(location.pathname);

  const isBuyerRoute =
    location.pathname.startsWith("/buyer-dashboard") ||
    location.pathname === "/buyer-profile" ||
    location.pathname.startsWith("/product/");

  const isSellerRoute =
    location.pathname.startsWith("/seller-dashboard") ||
    location.pathname === "/seller-profile";

  // Logo click handler for redirecting to respective dashboard based on role
  const handleLogoClick = () => {
    const role = localStorage.getItem('userRole');
    if (role === 'seller') {
      navigate('/seller-dashboard');
    } else if (role === 'buyer') {
      navigate('/buyer-dashboard');
    }
  };

  // Ensure the logo is clickable only after the user has chosen a role
  const canClickLogo = localStorage.getItem('userRole');

  return (
    <>
      {/* Conditionally render the Navbar */}
      {!shouldHideNavbar && <NavbarComponent showSearchBar={!isProductPage} />}

      {/* Show Logo on authentication pages */}
      {shouldHideNavbar && (
        <Logo onLogoClick={canClickLogo ? handleLogoClick : null} />
      )}

      {/* Render BuyerHeader for buyer routes, excluding product detail and profile pages */}
      {isBuyerRoute && location.pathname !== "/buyer-profile" && !isProductPage && (
        <div className="d-flex">
          <BuyerHeader showSearchBar={true} />
          <div className="flex-grow-1">{children}</div>
        </div>
      )}

      {/* Fallback rendering for all other routes */}
      {(!isBuyerRoute || location.pathname === "/buyer-profile") && !isProductPage && (
        <>
          {!shouldHideNavbar && !shouldHideLogo && location.pathname !== "/buyer-profile" && (
            <Logo onLogoClick={canClickLogo ? handleLogoClick : null} />
          )}
          <div className="flex-grow-1">{children}</div>
        </>
      )}

      {/* Direct rendering for product details page */}
      {isProductPage && (
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
            <Route path="/" element={ <Login />}/>
            <Route path="/verify" element={<Verification />} />
            
            {/* Product Details page */}
            <Route path="/product/:productId" element={<ProductDetail />} />

            <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
            <Route path="/buyer-profile" element={<BuyerProfile />} />
            <Route path="/request-product" element={<RequestProduct />} />
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/seller-profile" element={<SellerProfile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<BuyerProfile />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/session-expired" element={<SessionExpired />} />
          </Routes>
        </Layout>
        <Footer />
      </div>
    </Router>
  );
}

export default App;