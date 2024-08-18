import React, { useState } from 'react';

function AddStudent() {
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const student = { studentId, name };
    
    try {
      const response = await fetch('https://cus2fs8wsf.execute-api.ap-southeast-2.amazonaws.com/dev/addstudent', { // Replace with your API Gateway URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setStudentId('');
        setName('');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert('An error occurred');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h2>Add a New Student</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudent;
