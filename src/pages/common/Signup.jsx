import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { RESIDENCE_OPTIONS } from '../../constants/options';
import { sendOtp } from '../../services/api';
import { API_URL } from '../../config';

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
      const response = await axios.post(`${API_URL}/api/users`, {
        name: fullName,
        email: email,
        password: password,
        location: studentlocation,
      });

      const otpResponse = await sendOtp(email);
      if(otpResponse.status == 200){
        console.log("OTP sent to email:" , email);
      }

      if (response.status == 201) {
        console.log('User created successfully:', response.data);
        navigate('/verify', { state: { email: email } });
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
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: '100vh', paddingBottom: '80px' }} // Ensures space for the form and footer
    >
      <Row className="justify-content-center w-100">
        <Col md={6}>
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

            {/* Back to Login Button */}
            <Button
              variant="link"
              className="mt-3 w-100 text-secondary"
              style={{
                textDecoration: 'none',
                fontWeight: 'normal',
                fontSize: '1rem',
              }}
              onClick={() => navigate('/login')}
            >
              Back to Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
