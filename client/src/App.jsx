// src/App.js

import React from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/register/SignUp';
import HomePage from './components/HomePage';
import ForgotPassword from './components/forgotPassword/ForgotPassword'
import ResetPassword from './components/forgotPassword/ResetPassword';
import UserProfile from './components/UserProfile';
// import './styles.css'; // Import your CSS file

const App = () => {
  return (
    <>
      <p>aman</p>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/homepage" element={<HomePage/>} />
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/reset-password/:token' element={<ResetPassword/>}/>
          <Route path="/me" element={<UserProfile />} />
       
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
