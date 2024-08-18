import React from 'react';
import { useNavigate } from 'react-router-dom';

function ChoicePage() {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate('/login/admin');
  };

  const handleStudentLogin = () => {
    navigate('/login/student');
  };

  return (
    <div className="container choice-page">
      <h2>Welcome to the Library Management System</h2>
      <p>Please choose your role to continue:</p>
      <div className="buttons">
        <button onClick={handleAdminLogin}>Admin</button>
        <button onClick={handleStudentLogin}>Student</button>
      </div>
    </div>
  );
}

export default ChoicePage;
