import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../actions/authActions';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Signup.css';

// Validation schema
const SignupSchema = Yup.object().shape({
  userName: Yup.string().required('User Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  name: Yup.string().optional(), // Optional name field
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  termsAccepted: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, message, loading } = useSelector((state) => state.auth);

  const handleSubmit = (values, { setSubmitting }) => {
    const { userName, email, password, name } = values;
    dispatch(signupUser({ userName, email, password, name }));
    setSubmitting(false);
  };

  React.useEffect(() => {
    if (error) {
      toast.error(error, { autoClose: 3000 });
    }

    if (message) {
      toast.success('Registration successful!', { autoClose: 3000 });
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  }, [error, message, navigate]);

  return (
    <div className="signup-container">
      <ToastContainer />
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
      <h1>Signup</h1>
      <Formik
        initialValues={{ userName: '', email: '', name: '', password: '', confirmPassword: '', termsAccepted: false }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, handleChange }) => (
          <Form>
            <div>
              <Field type="text" name="userName" placeholder="UserName" className="input-field" />
              <ErrorMessage name="userName" component="div" className="error-message" />
            </div>
            <div>
              <Field type="email" name="email" placeholder="Email" className="input-field" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div>
              <Field type="text" name="name" placeholder="Full Name (Optional)" className="input-field" />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>
            <div className="password-field">
              <Field type={values.showPassword ? 'text' : 'password'} name="password" placeholder="Password" className="input-field" />
              <ErrorMessage name="password" component="div" className="error-message" />
              <span className="toggle-password" onClick={() => handleChange({ target: { name: 'showPassword', value: !values.showPassword } })}>
                {values.showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="password-field">
              <Field type={values.showConfirmPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Confirm Password" className="input-field" />
              <ErrorMessage name="confirmPassword" component="div" className="error-message" />
              <span className="toggle-password" onClick={() => handleChange({ target: { name: 'showConfirmPassword', value: !values.showConfirmPassword } })}>
                {values.showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="terms-container">
              <Field type="checkbox" name="termsAccepted" />
              <label>I accept the Terms and Conditions</label>
              <ErrorMessage name="termsAccepted" component="div" className="error-message" />
            </div>
            <div>
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                Signup
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="login-link">
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
