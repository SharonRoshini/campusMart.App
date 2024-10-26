import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
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
      const response = await axios.post('http://localhost:5000/api/users', {
        name: fullName,
        email,
        studentId,
        password,
      });

      if (response.status === 201) {
        console.log('User created successfully:', response.data);
        navigate('/login');
      } else {
        setError('Failed to create account');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('An error occurred during signup. Please try again.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
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

            <Form.Group controlId="formStudentId" className="mt-3">
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="900xxxxxx"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
              />
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

            <Button variant="success" type="submit" className="mt-4" block>
              Create Account
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
