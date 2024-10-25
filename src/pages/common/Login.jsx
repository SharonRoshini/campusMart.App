import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap'; // Bootstrap components

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // You can add logic for authentication here (like calling an API)
    console.log('Logging in with:', { email, password });

    // After login, redirect to the BuyerSellerChoice page
    navigate('/choose-role');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Welcome Back!</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formEmail">
              <Form.Label>PFW Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="your.name@pfw.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4" block>
              Login
            </Button>
          </Form>

          <div className="d-flex justify-content-between mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
            <Link to="/signup">Create a new account</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
