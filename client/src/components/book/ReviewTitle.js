import React from 'react';

export default function ReviewTitle({ book, handleCurrentReviews }) {
  return (
    <div className="review-title" onClick={() => handleCurrentReviews(book)}>
      {book.page}
    </div>
  );
}
