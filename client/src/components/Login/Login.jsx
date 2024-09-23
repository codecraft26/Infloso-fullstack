import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // New state for Remember Me
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated, loading } = useSelector((state) => state.auth);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // If "Remember Me" is checked, store the credentials in localStorage
    if (rememberMe) {
      localStorage.setItem('rememberedUser', JSON.stringify({ email, password }));
    } else {
      localStorage.removeItem('rememberedUser'); // Clear stored credentials if unchecked
    }

    dispatch(loginUser({ email, password }));
  };

  // Load remembered credentials on component mount
  useEffect(() => {
    const savedCredentials = localStorage.getItem('rememberedUser');
    if (savedCredentials) {
      const { email, password } = JSON.parse(savedCredentials);
      setEmail(email);
      setPassword(password);
      setRememberMe(true); // Set "Remember Me" as checked
    }
  }, []);

  // Redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Handle error display
  useEffect(() => {
    if (error) {
      toast.error(error, { autoClose: 3000 });
    }
  }, [error]);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
          <span className="toggle-password" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="remember-me">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label>Remember Me</label>
        </div>
        <div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
        </div>
      </form>

      <div className="login-actions">
        <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
        <Link to="/register" className="register-link">Don't have an account? Register</Link>
      </div>
    </div>
  );
};

export default Login;
