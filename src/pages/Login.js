import React, { useState } from 'react';
import { login } from '../Services/auth';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Ensure this is imported for styles

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(email, password);
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="homePageWrapper">
      <form onSubmit={handleSubmit} className="formWrapper">
        <h2 className="mainLabel">Login</h2>
        <div className="inputGroup">
          <input
            className="inputBox"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="inputBox"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn joinBtn">Login</button>
        </div>
        <p className="createInfo">
          Don’t have an account? <a className="createNewBtn" href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;