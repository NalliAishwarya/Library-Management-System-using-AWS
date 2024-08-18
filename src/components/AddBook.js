import React, { useState } from 'react';

function AddBook() {
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const book = { isbn, title, author, year };
    
    try {
      const response = await fetch('https://cus2fs8wsf.execute-api.ap-southeast-2.amazonaws.com/dev/addbook', { // Replace with your API Gateway URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setIsbn('');
        setTitle('');
        setAuthor('');
        setYear('');
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
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
