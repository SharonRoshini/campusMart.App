// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import Logo from './components/common/Logo';
// import Footer from './components/common/Footer';
// import Login from './pages/common/Login';
// import Signup from './pages/common/Signup';
// import ForgotPassword from './pages/common/ForgotPassword';
// import BuyerSellerChoice from './pages/common/BuyerSellerChoice';
// import BuyerDashboard from './pages/buyer/BuyerDashboard';
// import SellerDashboard from './pages/seller/SellerDashboard';
// import NavbarComponent from './components/common/NavbarComponent';
// import BuyerHeader from './components/buyer/BuyerHeader'; // Import BuyerHeader
// import SellerHeader from './components/seller/SellerHeader'; // Import SellerHeader
// import './App.css';

// function App() {
//   const Layout = ({ children }) => {
//     const location = useLocation();

//     // Show the navbar on dashboard pages
//     const showNavbar = location.pathname === '/buyer-dashboard' || location.pathname === '/seller-dashboard';

//     // Show the header on login, signup, and choose-role pages
//     const headerRoutes = ['/login', '/signup', '/choose-role', '/', '/forgot-password'];
//     const showHeader = headerRoutes.includes(location.pathname);

//     // Show BuyerHeader only on the buyer dashboard
//     const showBuyerHeader = location.pathname === '/buyer-dashboard';
//     // Show SellerHeader only on the seller dashboard
//     const showSellerHeader = location.pathname === '/seller-dashboard';

//     return (
//       <>
//         {showNavbar && <NavbarComponent />}
//         {showHeader && <Logo />}
//         {showBuyerHeader && <BuyerHeader />} {/* Show BuyerHeader */}
//         {showSellerHeader && <SellerHeader />} {/* Show SellerHeader */}
//         {children}
//       </>
//     );
//   };

//   return (
//     <Router>
//       <div className="app d-flex flex-column min-vh-100">
//         <Layout>
//           <div className="flex-grow-1">
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<Signup />} />
//               <Route path="/forgot-password" element={<ForgotPassword />} />
//               <Route path="/choose-role" element={<BuyerSellerChoice />} />
//               <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
//               <Route path="/seller-dashboard" element={<SellerDashboard />} />
//               <Route path="/" element={<Login />} />
//             </Routes>
//           </div>
//           <Footer />
//         </Layout>
//       </div>
//     </Router>
//   );
// }

// export default App;

// src/App.js

// src/App.js

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
  /**
   * Layout Component: Dynamically adjusts the header based on the route
   */
  const Layout = ({ children }) => {
    const location = useLocation();

    // Define routes to control visibility of specific headers
    const headerRoutes = ['/login', '/signup', '/choose-role', '/forgot-password', '/'];
    const showLogo = headerRoutes.includes(location.pathname);

    const showNavbar = ['/buyer-dashboard', '/seller-dashboard', '/product/:productId', '/buyer-profile', '/seller-profile'].some((route) =>
      location.pathname.startsWith(route.replace(':productId', ''))
    );

    const showBuyerHeader = location.pathname.startsWith('/buyer-dashboard') || location.pathname.startsWith('/buyer-profile');
    const showSellerHeader = location.pathname.startsWith('/seller-dashboard') || location.pathname.startsWith('/seller-profile');

    return (
      <>
        {showNavbar && <NavbarComponent />} {/* Show Navbar */}
        {showLogo && <Logo />} {/* Show Logo for common pages */}
        {showBuyerHeader && <BuyerHeader />} {/* Buyer-specific Header */}
        {showSellerHeader && <SellerHeader />} {/* Seller-specific Header */}
        {children}
      </>
    );
  };

  /**
   * App Component: Main routing logic with Layout wrapping all routes
   */
  return (
    <Router>
      <div className="app d-flex flex-column min-vh-100">
        <Layout>
          <div className="flex-grow-1">
            <Routes>
              {/* Common Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/choose-role" element={<BuyerSellerChoice />} />
              <Route path="/" element={<Login />} />

              {/* Product Detail */}
              <Route path="/product/:productId" element={<ProductDetail />} />

              {/* Buyer Routes */}
              <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
              <Route path="/buyer-profile" element={<BuyerProfile />} />

              {/* Seller Routes */}
              <Route path="/seller-dashboard" element={<SellerDashboard />} />
              <Route path="/seller-profile" element={<SellerProfile />} />
            </Routes>
          </div>
          <Footer />
        </Layout>
      </div>
    </Router>
  );
}

export default App;
