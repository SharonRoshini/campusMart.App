import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../../config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${API_URL}/api/users/verify`, {
        email,
        password,
      });

      if (response.data.verified) {
        console.log('Login successful!');
        navigate('/choose-role');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      console.error(err);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
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

            {error && <p className="text-danger mt-3">{error}</p>}

            {/* Login Button */}
            <Button variant="primary" type="submit" className="mt-4 w-100">
              Login
            </Button>
          </Form>

          {/* Subtle Buttons for Forgot Password and Create Account */}
          <div className="d-flex justify-content-between mt-3">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot Password?
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => navigate('/signup')}
            >
              Create a New Account
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
