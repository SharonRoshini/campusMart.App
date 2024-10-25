import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    console.log('Password reset requested for:', email);
    alert(`If an account with ${email} exists, a password reset link will be sent.`);
    navigate('/login');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Forgot Password</h2>
          <p className="text-center">Enter your PFW email to reset your password.</p>
          <Form onSubmit={handleForgotPassword}>
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

            <Button variant="primary" type="submit" className="mt-4" block>
              Send Reset Link
            </Button>
          </Form>

          <div className="text-center mt-3">
            <Button variant="link" onClick={() => navigate('/login')}>
              Back to Login
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
