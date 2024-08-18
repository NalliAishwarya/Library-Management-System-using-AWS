import React, { useState } from 'react';

function IssueBook({ issueBook }) {
  const [studentId, setStudentId] = useState('');
  const [bookIsbn, setBookIsbn] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    issueBook({ studentId, bookIsbn });
    setStudentId('');
    setBookIsbn('');
  };

  return (
    <div className="container">
      <h2>Issue a Book</h2>
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
          placeholder="Book ISBN"
          value={bookIsbn}
          onChange={(e) => setBookIsbn(e.target.value)}
          required
        />
        <button type="submit">Issue Book</button>
      </form>
    </div>
  );
}

export default IssueBook;

