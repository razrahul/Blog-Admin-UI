import React, { useState } from 'react';
import './Contact.scss';

const Contact = ({ requests }) => {
  // State to manage replies and the submitted requests
  const [replies, setReplies] = useState({});
  const [submittedReplies, setSubmittedReplies] = useState({});

  // Function to handle reply input changes
  const handleReplyChange = (id, value) => {
    setReplies((prevReplies) => ({
      ...prevReplies,
      [id]: value,
    }));
  };

  // Function to handle reply submission
  const handleReplySubmit = (id) => {
    const replyMessage = replies[id];
    if (replyMessage) {
      setSubmittedReplies((prevReplies) => ({
        ...prevReplies,
        [id]: replyMessage,
      }));
      alert(`Reply sent for Request ID ${id}: ${replyMessage}`);
      // Clear the reply input after submission
      setReplies((prevReplies) => ({
        ...prevReplies,
        [id]: '',
      }));
    } else {
      alert('Reply message cannot be empty.');
    }
  };

  return (
    <div className="contact-container">
      <h1>Contact Requests</h1>
      <div className="request-list">
        {requests.map((request) => (
          <div className="request-card" key={request.id}>
            <div className="request-info">
              <div>
                <strong>{request.name}</strong>
                <p>Email: {request.email}</p>
                <p>Phone No: {request.phone}</p>
                <p className="request-date">Date: {request.date}</p>
              </div>
            </div>
            <div className="request-info-right">
              <div className="request-message">
                <p><strong>Message:</strong> {request.message}</p>
              </div>
              <div className="reply-section">
                {/* Display previous replies */}
                {submittedReplies[request.id] && (
                  <div className="reply-message">
                    <strong>Reply:</strong>
                    <p>{submittedReplies[request.id]}</p>
                  </div>
                )}

                {/* Display reply input only if there is no reply */}
                {!submittedReplies[request.id] && (
                  <>
                    <textarea
                      placeholder="Write a reply..."
                      value={replies[request.id] || ''}
                      onChange={(e) => handleReplyChange(request.id, e.target.value)}
                    />
                    <button onClick={() => handleReplySubmit(request.id)}>Send Reply</button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
