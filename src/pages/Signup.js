import React, { useState } from 'react';
import { signup } from '../Services/auth';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // make sure this is present to import styles

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      alert('Signup successful');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="homePageWrapper">
      <form onSubmit={handleSubmit} className="formWrapper">
        <h2 className="mainLabel">Sign Up</h2>
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
          <button type="submit" className="btn joinBtn">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;