import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/common/Login';
import Signup from './pages/common/Signup';
import ForgotPassword from './pages/common/ForgotPassword';
import BuyerSellerChoice from './pages/common/BuyerSellerChoice'; // Import the choice page
import BuyerDashboard from './pages/buyer/BuyerDashboard';           // Import the buyer dashboard
import SellerDashboard from './pages/seller/SellerDashboard';        // Import the seller dashboard
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/choose-role" element={<BuyerSellerChoice />} />  {/* New route */}
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />  {/* Buyer route */}
          <Route path="/seller-dashboard" element={<SellerDashboard />} />{/* Seller route */}
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
