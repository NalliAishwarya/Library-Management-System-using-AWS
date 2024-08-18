import React, { useState, useEffect } from 'react';
import BookRequests from './BookRequests';

function BookRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Replace with your AWS API endpoint
        const response = await fetch('https://cus2fs8wsf.execute-api.ap-southeast-2.amazonaws.com/dev/req');
        if (!response.ok) {
          throw new Error('Failed to fetch requests');
        }
        console.log(response);
        const data = await response.json();
        setRequests(data.requests || []); // Assuming API response contains a `requests` field
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (request) => {
    try {
      // Replace with your API endpoint to accept a request
      const response = await fetch('', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Pass request details as query parameters
        body: JSON.stringify({
          user_id: request.userId, // Adjust field names as per your request
          isbn: request.isbn,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to accept request');
      }

      // Update the local state to reflect the accepted request
      setRequests((prevRequests) =>
        prevRequests.filter((r) => r !== request)
      );

      alert(`Request for ${request.bookTitle} accepted`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="book-requests-page">
      {loading ? (
        <p>Loading requests...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <BookRequests requests={requests} onAccept={handleAccept} />
      )}
    </div>
  );
}

export default BookRequestsPage;
