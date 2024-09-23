import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { resetpassword } from '../../actions/authActions'; // Import the correct action
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // For extracting token from URL
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import 'react-toastify/dist/ReactToastify.css';
import './ForgotPassword.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const { token } = useParams(); // Extract token from URL

    console.log(token)


  const { error, message } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match', { autoClose: 3000 });
      return;
    }

    // Dispatch reset password action with token

  
    dispatch(resetpassword( {password, token }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { autoClose: 3000 });
    }
    if (message) {
      toast.success(message, { autoClose: 3000 });
    }
  }, [error, message]);

  return (
    <div className="forgot-password-container">
      <ToastContainer />
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
          <span
            className="password-toggle-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div className="password-input-container">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input-field"
          />
          <span
            className="password-toggle-icon"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div>
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
