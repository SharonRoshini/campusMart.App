import React from 'react';
import { useNavigate } from 'react-router-dom';

const BuyerSellerChoice = () => {
  const navigate = useNavigate();

  const handleChoice = (role) => {
    if (role === 'buyer') {
      navigate('/buyer-dashboard'); // Navigate to the buyer's dashboard
    } else if (role === 'seller') {
      navigate('/seller-dashboard'); // Navigate to the seller's dashboard
    }
  };

  return (
    <div className="choice-container">
      <h2>Choose your Role</h2>
      <p>Please select if you are a Buyer or Seller</p>
      <div className="choice-buttons">
        <button onClick={() => handleChoice('buyer')}>I am a Buyer</button>
        <button onClick={() => handleChoice('seller')}>I am a Seller</button>
      </div>
    </div>
  );
};

export default BuyerSellerChoice;
