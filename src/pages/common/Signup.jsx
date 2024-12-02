import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { RESIDENCE_OPTIONS } from '../../constants/options';


const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [studentlocation, setStudentLocation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/users', {
        name: fullName,
        email: email,
        password: password,
        location: studentlocation,
      });

      if (response.status === 201) {
        console.log('User created successfully:', response.data);
        navigate('/login');
      } else {
        setError('Failed to create account');
      }
    } catch (error) {
      console.error('Request failed:', error);
      if (error.response) {
        console.log('Response error:', error.response.data);
        console.log('Response status:', error.response.status);
      } else if (error.request) {
        console.log('No response received:', error.request);
      } else {
        console.log('Error:', error.message);
      }
    }
  };

  return (
    <>
      {/* Signup Form */}
      <Container
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: '100vh', paddingBottom: '80px' }} // Ensures space for form and footer
      >
        <Row className="justify-content-center w-100">
          <Col md={6}>
            {/* Back to Login Button */}
            <div className="d-flex justify-content-end mb-2">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => navigate('/login')}
              >
                Back to Login
              </Button>
            </div>

            <h2 className="text-center mb-4">Create Account</h2>
            <Form onSubmit={handleSignup}>
              <Form.Group controlId="formFullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>PFW Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="your.name@pfw.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formStudentLocation" className="mt-3">
                <Form.Label>Student Location</Form.Label>
                <Form.Control
                  as="select"
                  value={studentlocation}
                  onChange={(e) => setStudentLocation(e.target.value)}
                  required
                >
                  <option value="">Select Student Location</option>
                  {RESIDENCE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formConfirmPassword" className="mt-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
              {error && <p className="text-danger mt-3">{error}</p>}

              {/* Create Account Button */}
              <Button
                variant="outline-secondary"
                type="submit"
                className="mt-4 w-100"
              >
                Create Account
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer
        className="py-3 bg-dark text-light mt-auto"
        style={{ fontSize: '0.85rem' }}
      >
        <div className="container text-center">
          <p className="mb-1">
            © {new Date().getFullYear()} CampusMart. All rights reserved.
          </p>
          <div>
            <a href="/privacy-policy" className="text-light">
              Privacy Policy
            </a>{' '}
            |{' '}
            <a href="/terms-of-service" className="text-light">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Signup;
