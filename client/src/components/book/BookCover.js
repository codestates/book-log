import React from 'react';
import { Link } from 'react-router-dom';

export default function BookCover({ book, handleCurrentbook }) {
  return (
    <div className="bookCard" onClick={() => handleCurrentbook(book)}>
      <div style={{ flex: 3 }}>
        <img width="100%" height="100%" src={book.thumbnail} />
      </div>
    </div>
  );
}
