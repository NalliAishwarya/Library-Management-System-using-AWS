import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLoginPage({ setIsAdminLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://cus2fs8wsf.execute-api.ap-southeast-2.amazonaws.com/dev/adminlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: username, password }), // Assuming the backend uses user_id
      });

      const data = await response.json();

      if (response.ok) {
        if (data.statusCode===200) {
          setIsAdminLoggedIn(true);
          navigate('/'); // Redirect to home or admin dashboard
        } else {
          setError(data.message || 'Invalid username or password');
        }
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (error) {
      setError('An error occurred during the request');
    }
  };

  return (
    <div className="container login-page">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default AdminLoginPage;
