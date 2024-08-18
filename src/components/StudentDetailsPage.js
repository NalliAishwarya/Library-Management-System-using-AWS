import React, { useEffect, useState } from 'react';

function StudentDetailsPage() {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        // Replace with your API endpoint for fetching student details
        const response = await fetch('https://your-api-endpoint/student-details', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add authentication headers if required
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStudent(data);
        } else {
          const data = await response.json();
          setError(data.message || 'Failed to fetch student details');
        }
      } catch (error) {
        setError('An error occurred while fetching student details');
      }
    };

    fetchStudentDetails();
  }, []);

  return (
    <div className="container student-details-page">
      <h2>Student Details</h2>
      {error && <p className="error">{error}</p>}
      {student ? (
        <div>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Student ID:</strong> {student.studentId}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default StudentDetailsPage;
