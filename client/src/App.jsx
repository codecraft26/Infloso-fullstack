import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import 'tailwindcss/tailwind.css';

const schema = yup.object().shape({
  username: yup.string().required('Username or email is required').email('Invalid email format'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  name: yup.string(),
  profilePicture: yup.mixed(),
  terms: yup.bool().oneOf([true], 'You must accept the terms and conditions'),
});

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });


  const onSubmit = (data) => {
    // Simulate sending a welcome email (just a console log)
    console.log('Welcome Email Sent:', data.username);
    // Redirect to login page after successful signup
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Signup for MelodyVerse</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username/Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Username / Email</label>
            <input
              {...register('username')}
              className={`w-full px-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              placeholder="Enter your email"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register('password')}
              className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              {...register('confirmPassword')}
              className={`w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          {/* Optional Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name (Optional)</label>
            <input
              {...register('name')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your name"
            />
          </div>

          {/* Optional Profile Picture */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Picture (Optional)</label>
            <input
              type="file"
              {...register('profilePicture')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('terms')}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              I agree to the <span className="text-blue-500">terms and conditions</span>
            </label>
          </div>
          {errors.terms && <p className="text-red-500 text-sm">{errors.terms.message}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/login')}>
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
