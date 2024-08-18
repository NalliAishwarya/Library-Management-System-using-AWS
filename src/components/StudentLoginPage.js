import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentLoginPage({ setIsStudentLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Replace with your student login API endpoint
      const response = await fetch('https://cus2fs8wsf.execute-api.ap-southeast-2.amazonaws.com/dev/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsStudentLoggedIn(true);
        navigate('/student-page');
      } else {
        const data = await response.json();
        setError(data.message || 'Invalid username or password');
      }
    } catch (error) {
      setError('An error occurred during the request');
    }
  };

  return (
    <div className="container login-page">
      <h2>Student Login</h2>
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

export default StudentLoginPage;
