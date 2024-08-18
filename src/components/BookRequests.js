import React, { useState, useEffect } from 'react';

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
        console.log("Rr", response);
        const data = await response.json();
        
        // Extract the requests from the response body
        const requests = JSON.parse(data.body).requests;
        setRequests(requests || []); // Set requests state
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
      // Prepare the request body
      const requestBody = {
        user_id: request.user_id,
        isbn: request.isbn,
        req_id: request.req_id,
        book_author:request.book_author,
        book_name:request.book_name,        // Include req_id here
      };
  
      // Replace with your API endpoint to accept a request
      const response = await fetch('https://cus2fs8wsf.execute-api.ap-southeast-2.amazonaws.com/dev/accept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody), // Send the request body as JSON
      });
  
      if (!response.ok) {
        throw new Error('Failed to accept request');
      }
  
      // Update the local state to reflect the accepted request
      setRequests((prevRequests) =>
        prevRequests.filter((r) => r.req_id !== request.req_id)
      );
  
      alert(`Request for ISBN ${request.isbn} accepted`);
    } catch (err) {
      alert(err.message);
    }
  };
  

  const handleReject = async (request) => {
    try {
      // Define the API endpoint for rejecting the request
      const response = await fetch('https://cus2fs8wsf.execute-api.ap-southeast-2.amazonaws.com/dev/reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: request.user_id,
          isbn: request.isbn,
          req_id: request.req_id, // Include req_id here
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to reject request');
      }
      else{
        console.log(response);
      }
      // Update the local state to reflect the rejected request
      setRequests((prevRequests) =>
        prevRequests.filter((r) => r.req_id !== request.req_id)
      );
  
      alert(`Request for ISBN ${request.isbn} rejected`);
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
        <div className="container">
          <h2>Book Requests</h2>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>ISBN</th>
                <th>Request ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr key={index}>
                  <td>{request.user_id}</td>
                  <td>{request.isbn}</td>
                  <td>{request.req_id}</td>
                  <td>
                    <button onClick={() => handleAccept(request)}>Accept</button>
                    <button onClick={() => handleReject(request)}>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BookRequestsPage;
