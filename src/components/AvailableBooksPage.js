import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function AvailableBooksPage() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const user = location.state?.user; // Retrieve user details from navigation state
  console.log("User Details:", user, typeof(user));

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://cus2fs8wsf.execute-api.ap-southeast-2.amazonaws.com/dev/getbooks');

        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }

        const data = await response.json();
        const booksArray = JSON.parse(data.body); // Ensure this is a valid JSON string
        setBooks(booksArray);
      } catch (err) {
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleRequest = async (book) => {
    try {
      if (!user || !user.studentId) {
        throw new Error('User not logged in');
      }

      const response = await fetch('https://cus2fs8wsf.execute-api.ap-southeast-2.amazonaws.com/dev/req', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId: book.ISBN,         // Book ID (ISBN)
          userId: user.studentId,    // User ID
          bookName: book.Title,      // Book Name
          bookAuthor: book.Author    // Book Author
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to request book');
      }

      alert(`Successfully requested book: ${book.Title}`);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="available-books-page">
      <h2>Available Books</h2>

      {loading ? (
        <p>Loading books...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="available-books">
          {books.length > 0 ? (
            <ul>
              {books.map((book) => (
                <li key={book.ISBN}>
                  <div className="book-details">
                    <h4>{book.Title}</h4>
                    <p><strong>Author:</strong> {book.Author}</p>
                    <p><strong>ISBN:</strong> {book.ISBN}</p>
                    <button onClick={() => setSelectedBook(book)}>View Details</button>
                  </div>
                  <button onClick={() => handleRequest(book)}>Request</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No books available at the moment.</p>
          )}
        </div>
      )}

      {selectedBook && (
        <div className="book-details-box">
          <h3>Book Details</h3>
          <p><strong>Title:</strong> {selectedBook.Title}</p>
          <p><strong>Author:</strong> {selectedBook.Author}</p>
          <p><strong>ISBN:</strong> {selectedBook.ISBN}</p>
          <button onClick={() => setSelectedBook(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default AvailableBooksPage;
