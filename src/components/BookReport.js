import React, { useEffect, useState } from 'react';

function BookReport() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://cus2fs8wsf.execute-api.ap-southeast-2.amazonaws.com/dev/getbooks'); // Replace with your API Gateway URL
        const data = await response.json();
        if (response.ok) {
          console.log("data=",data);
          const booksArray = JSON.parse(data.body);
          console.log("books=",booksArray);
          setBooks(booksArray);
        } else {
          console.error('Error fetching books:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container">
      <h2>Book Report</h2>
      <table>
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{book.ISBN}</td>
              <td>{book.Title}</td>
              <td>{book.Author}</td>
              <td>{book.Year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookReport;
