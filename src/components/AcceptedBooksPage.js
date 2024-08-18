import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function AllocatedBooksPage() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const location = useLocation();
  const user = location.state?.user; // Safely retrieve user from navigation state
  console.log("available",user);
  useEffect(() => {
    if (!user?.studentId) {
      setError('No user ID provided');
      return;
    }

    const fetchBooks = async () => {
      try {
        const response = await fetch('https://cus2fs8wsf.execute-api.ap-southeast-2.amazonaws.com/dev/alloc', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: user.studentId }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("books",data);
          let data1=JSON.parse(data.body);
          console.log(data1)
          setBooks(data1);
        } else {
          const data = await response.json();
          setError(data.message || 'Failed to fetch allocated books');
        }
      } catch (error) {
        setError('An error occurred while fetching the data');
      }
    };

    fetchBooks();
  }, [user?.studentId]); // Ensure that the dependency array includes user?.studentId

  return (
    <div className="allocated-books-page">
      <h2>Allocated Books</h2>
      {error && <p className="error">{error}</p>}
      {books.length > 0 ? (
        <ul>
          {books.map((book, index) => (
            <li key={index}>
              <p><strong>Book ID:</strong> {book.isbn}</p>
              <p><strong>Title:</strong> {book.book_name}</p>
              <p><strong>Author:</strong> {book.book_author}</p>
              {/* Add more book details as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No books allocated</p>
      )}
    </div>
  );
}

export default AllocatedBooksPage;
