import React from 'react';
import BookCover from '../components/book/BookCover';
import dummyBooks from '../dummybooks';
import { Link } from 'react-router-dom';

export default function BookListPage() {
  const dummybooks = dummyBooks;
  return (
    <div className="booklistBox">
      <Link to="/review/book">
        <button className="add-bookbtn">도서 추가</button>
      </Link>
      <div className="book-list">
        {dummybooks.length !== 0
          ? dummybooks.map((book) => (
              <BookCover key={book.book_id} book={book} />
            ))
          : '도서 목록이 비었습니다'}
      </div>
    </div>
  );
}
