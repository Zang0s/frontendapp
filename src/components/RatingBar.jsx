import React from 'react';

function RatingBar({ rate }) {
  const stars = [];
  
  for (let i = 1; i <= 10; i++) {
    stars.push(
      <span
        key={i}
        style={{
          color: i <= rate ? '#ffc107' : '#e9ecef',
          fontSize: '1.2rem',
          marginRight: '2px'
        }}
      >
        ★
      </span>
    );
  }
  
  return (
    <div className="d-flex align-items-center">
      <span className="me-2">Rating:</span>
      {stars}
      <span className="ms-2 text-muted">({rate}/10)</span>
    </div>
  );
}

export default RatingBar;
