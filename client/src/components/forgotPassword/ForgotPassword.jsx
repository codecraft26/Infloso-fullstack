import React, { useEffect, useState } from 'react';
import { forgotpassword } from '../../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, message } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter a valid email');
      return;
    }

    setLoading(true);
    dispatch(forgotpassword({ email }));
  };

  useEffect(() => {
    if (error) {
      setLoading(false);
      alert(error);
    }
    if (message) {
      setLoading(false);
      // Navigate to success page with message
      navigate('/success', { state: { message } });
    }
  }, [error, message, navigate]);

  return (
    <div className="forgot-password-container">
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </div>
      </form>

      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
