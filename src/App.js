import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Logo from './components/common/Logo';
import Footer from './components/common/Footer'; // Import Footer
import Login from './pages/common/Login';
import Signup from './pages/common/Signup';
import ForgotPassword from './pages/common/ForgotPassword';
import BuyerSellerChoice from './pages/common/BuyerSellerChoice';
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import SellerDashboard from './pages/seller/SellerDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app d-flex flex-column min-vh-100"> {/* Full viewport height */}
        <Logo />
        <div className="flex-grow-1"> {/* Content area */}
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
    </Router>
  );
}

export default App;
