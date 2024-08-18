import React, { useEffect, useState } from 'react';

function StudentReport() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('https://cus2fs8wsf.execute-api.ap-southeast-2.amazonaws.com/dev/getstudents'); // Replace with your API Gateway URL
        const data = await response.json();

        if (response.ok) {
          console.log("data=",data);
          const booksArray = JSON.parse(data.body);
          console.log("books=",booksArray);
          setStudents(booksArray); // No need to parse, as data is already a JavaScript object
        } else {
          console.error('Error fetching students:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="container">
      <h2>Student Report</h2>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.StudentID}</td>
              <td>{student.Name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentReport;
