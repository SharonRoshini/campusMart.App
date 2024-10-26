import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BuyerSellerChoice = () => {
  const navigate = useNavigate();

    // In BuyerSellerChoice.js or wherever the user selects their role
  const setRole = (role) => {
  localStorage.setItem('userRole', role); // Save the role to localStorage
  };

  const handleChoice = (role) => {
    if (role === 'buyer') {
      navigate('/buyer-dashboard');
      setRole('buyer');
    } else {
      navigate('/seller-dashboard');
      setRole('seller');
    }
  };



  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <h2 className="mb-4">Choose Your Role</h2>
          <p>Please select if you are a Buyer or Seller</p>
          <div className="d-flex justify-content-around">
            <Button
              variant="primary"
              size="lg"
              onClick={() => handleChoice('buyer')}
            >
              I am a Buyer
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => handleChoice('seller')}
            >
              I am a Seller
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BuyerSellerChoice;
