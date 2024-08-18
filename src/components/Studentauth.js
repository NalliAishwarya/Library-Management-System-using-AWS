import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StudentAuthPage() {
  const [isRegistering, setIsRegistering] = useState(true);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      if (isRegistering) {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        // Registration API request
        const response = await fetch('https://cus2fs8wsf.execute-api.ap-southeast-2.amazonaws.com/dev/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, username, password }),
        });

        if (response.ok) {
          // On successful registration, redirect to login page
          navigate('/login/student');
        } else {
          const data = await response.json();
          setError(data.message || 'Registration failed');
        }
      } else {
        // Login API request
        const response = await fetch('https://cus2fs8wsf.execute-api.ap-southeast-2.amazonaws.com/dev/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, password }), // Include userId for login
        });

        if (response.ok) {
          const data = await response.json();
          console.log("data",data);
          if (data.statusCode === 200) {
            try {
              const data1 = JSON.parse(data.body);
              // Handle successful login
              navigate('/studentpage', { state: { user: data1 } });
            } catch (err) {
              setError('Failed to parse response data');
            }
          } else {
            setError(data.message || 'Login failed');
          }
        } else {
          const data = await response.json();
          setError(data.message || 'Login failed');
        }
      }
    } catch (error) {
      setError('An error occurred during the request');
    }
  };

  return (
    <div className="container student-auth-page">
      <h2>{isRegistering ? 'Student Registration' : 'Student Login'}</h2>
      <form onSubmit={handleAuth}>
        {isRegistering && (
          <>
            <input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </>
        )}
        {!isRegistering && (
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        )}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {isRegistering && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        )}
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
        <p>
          {isRegistering ? 'Already have an account? ' : 'Need to register? '}
          <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Login' : 'Register'}
          </button>
        </p>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default StudentAuthPage;
