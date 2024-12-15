import React, { useEffect } from 'react';
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
import NavbarComponent from './components/common/NavbarComponent';
import BuyerHeader from './components/buyer/BuyerHeader';
import ProductDetail from './pages/buyer/ProductDetails';
import RequestProduct from './pages/buyer/RequestProduct';
import Verification from './pages/common/Verification';
import Wishlist from './pages/common/Wishlist';
import SessionExpired from './pages/common/SessionExpired';
import BuyerNotifications from './pages/buyer/BuyerNotifications';
import SellerNotifications from './pages/seller/SellerNotifications';
import { FilterProvider } from './components/buyer/Filtercontext';
import './styles/buyerHeader.css';
import './App.css';
import UpdatePassword from './pages/common/UpdatePassword';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');

    if (userRole) {
      if (
        (userRole === 'buyer' && (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup'))
      ) {
        navigate('/buyer-dashboard');
      } else if (
        userRole === 'seller' && (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup')
      ) {
        navigate('/seller-dashboard');
      }
    }
  }, [location.pathname, navigate]);

  // Check if the current page is the product detail page
  const isProductPage = location.pathname.startsWith("/product/");

  // Define routes where Navbar should be hidden
  const shouldHideNavbar = [
    "/login",
    "/signup",
    "/forgot-password",
    "/choose-role",
    "/session-expired",
    "/",
    "/verify",
    "/update-password",
    "/privacy-policy",
    "/terms-of-service"
  ].includes(location.pathname);

  // Define routes where Logo should be hidden
  const shouldHideLogo = [
    "/buyer-notifications",
    "/seller-notifications",
    "/request-product",
    "/wishlist",
    "/notifications",
    "/seller-dashboard",
  ].includes(location.pathname);

  const isBuyerRoute =
    location.pathname.startsWith("/buyer-dashboard") ||
    location.pathname.startsWith("/product/");

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

      {/* Render BuyerHeader for buyer routes, excluding product detail*/}
      {/* Render BuyerHeader for buyer routes, excluding product detail*/}
      {isBuyerRoute && !isProductPage && (
        <div className="buyer-layout d-flex">
          <BuyerHeader showSearchBar={true} />
          <div className="content-wrapper flex-grow-1">{children}</div>
        </div>
      )}

      {/* Fallback rendering for all other routes */}
      {(!isBuyerRoute) && !isProductPage && (
        <>
          {!shouldHideNavbar && !shouldHideLogo && (
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
      <FilterProvider>
        <div className="app d-flex flex-column min-vh-100">
          <Layout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/choose-role" element={<BuyerSellerChoice />} />
              <Route path="/" element={<Login />} />
              <Route path="/verify" element={<Verification />} />

              {/* Product Details page */}
              <Route path="/product/:productId" element={<ProductDetail />} />

              <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
              <Route path="/request-product" element={<RequestProduct />} />
              <Route path="/seller-dashboard" element={<SellerDashboard />} />
              <Route path="/buyer-notifications" element={<BuyerNotifications />} />
              <Route path="/seller-notifications" element={<SellerNotifications />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/update-password" element={<UpdatePassword />} />
              <Route path="/session-expired" element={<SessionExpired />} />
            </Routes>
          </Layout>
          <Footer />
        </div>
      </FilterProvider>
    </Router>
  );
}

export default App;