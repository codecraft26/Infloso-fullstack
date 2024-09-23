import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { forgotpassword } from '../../actions/authActions'; // Import the correct action
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const { error, message } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter a valid email', { autoClose: 3000 });
      return;
    }

    // Dispatch forgot password action instead of loginUser
    dispatch(forgotpassword({ email }));
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
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
