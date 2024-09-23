import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../actions/authActions'; // Import the action

const UserProfile = () => {
  const dispatch = useDispatch();
  
  // Get user data and loading status from Redux store
  const { user, loading, error } = useSelector((state) => state.auth);

  // Dispatch the loadUser action when the component mounts
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (loading) {
    return <p>Loading user information...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user.id}</p>
          <p><strong>Username:</strong> {user.username}</p>
          {/* Add more fields based on the decoded token */}
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default UserProfile;
