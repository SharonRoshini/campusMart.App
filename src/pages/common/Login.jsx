import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    <div className="auth-container">
      <h2>Welcome Back!</h2>
      <form onSubmit={handleLogin}>
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
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="auth-links">
        <Link to="/forgot-password">Forgot Password?</Link>  {/* Forgot Password Link */}
        <Link to="/signup">Create a new account</Link>        {/* Create Account Link */}
      </div>
    </div>
  );
};

export default Login;
