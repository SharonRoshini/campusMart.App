import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/users/verify', {
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
      setError(err.response.data.message);
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
