import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../actions/authActions';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false); // New state for terms acceptance

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, message } = useSelector((state) => state.auth);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match', { autoClose: 3000 });
      return;
    }
    if (!termsAccepted) {
      toast.error('You must accept the terms and conditions', { autoClose: 3000 });
      return; // Prevent form submission if terms are not accepted
    }
    dispatch(signupUser({ userName, email, password }));
  };

  // Redirect to login after signup success
  useEffect(() => {
    if (error) {
      toast.error(error, { autoClose: 3000 });
    }

    if (message) {
      toast.success('Registration successful!', { autoClose: 3000 });
      // Reset form after successful signup
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setUserName('');
      setTermsAccepted(false); // Reset terms acceptance

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  }, [error, message, navigate]);

  return (
    <div className="signup-container">
      <ToastContainer />
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="UserName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="input-field"
          />
        </div>
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
        <div className="password-field">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input-field"
          />
          <span className="toggle-password" onClick={toggleConfirmPasswordVisibility}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="terms-container">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <label>I accept the Terms and Conditions</label>
        </div>
        <div>
          <button type="submit" className="btn-primary" disabled={!termsAccepted}>
            Signup
          </button>
        </div>
      </form>

      {/* Login link instead of button */}
      <div className="login-link">
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
