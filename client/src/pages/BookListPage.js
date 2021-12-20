import React, { useState } from 'react';
import BookCover from '../components/book/BookCover';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function BookListPage({ handleCurrentbook, currentBook }) {
  axios.defaults.withCredentials = true;

  const [bookList, setBookList] = useState([]); // **
  const [errorMessage, setErrorMessage] = useState(''); // **

  const bookListRequest = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_SERVER_URL}/book`,
    })
      .then((result) => {
        if (result.status === 200) {
          setBookList(result.data.data.book_list); //요청해서 가져온 책 배열을 bookList에 저장
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          setErrorMessage('서버에 문제가 있습니다. 잠시 후 시도해주세요.');
        }
      });
  };

  useEffect(() => {
    bookListRequest();
  }, []);
  console.log(bookList);
  return (
    <div className="booklistBox">
      <button className="add-bookbtn">
        <Link to="/review/book">도서 추가</Link>
      </button>
      <div className="book-list">
        {bookList.length !== 0
          ? bookList.map((book) => (
              <BookCover
                key={book.book_id}
                book={book}
                handleCurrentbook={handleCurrentbook}
                currentBook={currentBook}
              />
            ))
          : '도서를 추가해주세요.'}
      </div>
      <div className="alert-box">{errorMessage}</div>
    </div>
  );
}
