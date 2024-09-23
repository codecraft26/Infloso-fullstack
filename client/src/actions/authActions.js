import axios from 'axios';
import { API_ENDPOINTS } from '../config/apiConfig';

// Dynamically import jwt-decode to avoid Vite bundling issues
export const loginUser = (credentials) => async (dispatch) => {
  const userInfo = {
    email: credentials.email,
    password: credentials.password,
  };

  try {
    const { data } = await axios.post(API_ENDPOINTS.LOGIN, userInfo);

    if (data.success) {
      const { token, user } = data; // Destructure token and user from response

      // Store token in localStorage
      localStorage.setItem('token', token);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user }, // Dispatch both decoded token and user data
      });
    } else {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: 'Login failed. Please check your credentials.', // Handle failure case
      });
    }
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAIL',
      payload: error.response ? error.response.data.message : 'Network error', // Better error handling
    });
  }
};

export const signupUser = (userDetails) => async (dispatch) => {
  dispatch({ type: 'SIGNUP_LOADING' }); // Add this line to indicate loading

  try {
    const { data } = await axios.post(API_ENDPOINTS.REGISTER, userDetails);

    dispatch({
      type: 'SIGNUP_SUCCESS',
      message: data.message, // Ensure to use 'message' here
    });
  } catch (error) {
    dispatch({
      type: 'SIGNUP_FAIL',
      payload: error.response ? error.response.data.message : 'Network error',
    });
  }
};

export const forgotpassword = (email) => async (dispatch) => {
  try {
    const { data } = await axios.post(API_ENDPOINTS.FORGOT_PASSWORD, email);

    dispatch({
      type: 'FORGOT_PASSWORD_SUCCESS',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'FORGOT_PASSWORD_FAIL',
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : 'Network error',
    });
  }
};

export const resetpassword = ({ password, token }) => async (dispatch) => {
  console.log('Token:', token);
  console.log('Password:', password);

  try {
    const { data } = await axios.put(API_ENDPOINTS.RESET_PASSWORD(token), { password });

    dispatch({
      type: 'RESET_PASSWORD',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'RESET_PASSWORD_FAIL',
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : 'An error occurred',
    });
  }
};

export const loadUser = () => async (dispatch) => {
  console.log('Load User');

  try {
    const token = localStorage.getItem('token');

    if (token) {
      const jwtDecode = (await import('jwt-decode')).default; // Dynamically import jwt-decode
      const decoded = jwtDecode(token); // Decode token

      console.log('Decoded:', decoded);

      // Dispatch success action
      dispatch({
        type: 'LOAD_USER_SUCCESS',
        payload: decoded,
      });
    } else {
      // If no token is found, dispatch fail action
      dispatch({
        type: 'LOAD_USER_FAIL',
        payload: 'No token found. Please log in again.',
      });
    }
  } catch (error) {
    console.error('Error in loading user:', error);
    // Handle error
    dispatch({
      type: 'LOAD_USER_FAIL',
      payload: error.message || 'Failed to load user data.',
    });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: 'LOGOUT' });
};
