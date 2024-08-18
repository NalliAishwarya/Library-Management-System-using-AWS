// src/components/LoginPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage({ setIsAdminLoggedIn, setIsStudentLoggedIn, userType }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    if (userType === 'admin') {
      setIsAdminLoggedIn(true);
      navigate('/');
    } else if (userType === 'student') {
      setIsStudentLoggedIn(true);
      navigate('/student-page');
    }
  };

  return (
    <div className="login-page">
      <h2>{userType === 'admin' ? 'Admin Login' : 'Student Login'}</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
