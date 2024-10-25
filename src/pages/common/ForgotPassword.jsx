import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Logic to handle password reset (e.g., API call)
    console.log('Password reset requested for:', email);
    alert(`If an account with ${email} exists, a password reset link will be sent.`);
    // After handling, navigate back to login
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <p>Enter your PFW email to reset your password.</p>
      <form onSubmit={handleForgotPassword}>
        <div>
          <label htmlFor="email">PFW Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your.name@pfw.edu"
          />
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
      <div>
        <a href="#" onClick={() => navigate('/login')}>Back to Login</a>
      </div>
    </div>
  );
};

export default ForgotPassword;
