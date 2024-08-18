import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function StudentPage() {
  const location = useLocation();
  const user = location.state?.user; // Retrieve user details from navigation state

  return (
    <div className="student-page">
      <h2>Welcome to the Student Dashboard</h2>

      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Student ID:</strong> {user.studentId}</p>

          <nav>
            <Link to="/available-books" state={{ user }}>
              Available Books
            </Link>
            <br />
            <Link to="/accepted-books" state={{ user }}>
              Accepted Books
            </Link>
          </nav>
        </div>
      ) : (
        <p>No user information available.</p>
      )}
    </div>
  );
}

export default StudentPage;
