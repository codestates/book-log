import React, { useState } from 'react';
import BookCover from '../components/book/BookCover';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router';
const BeforeLoginModal = styled(Modal)``;

const BookListContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  width: 500px;
  height: 500px;
  border-radius: 40px;
  margin: auto;
  padding: 3em;
  font-size: 14px;
`;
const NoBook = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -150px;
  font-size: 15px;
`;
export default function BookListPage({
  handleCurrentbook,
  currentBook,
  isLogin,
}) {
  axios.defaults.withCredentials = true;

  const [bookList, setBookList] = useState([]); // **
  const [errorMessage, setErrorMessage] = useState(''); // **
  const navigate = useNavigate();
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
    <div>
      {isLogin ? (
        <BookListContainer>
          <button className="add-bookbtn">
            <Link to="/review/book">도서 추가</Link>
          </button>
          <div className="book-list">
            {bookList.length !== 0 ? (
              bookList.map((book) => (
                <BookCover
                  key={book.book_id}
                  book={book}
                  handleCurrentbook={handleCurrentbook}
                  currentBook={currentBook}
                />
              ))
            ) : (
              <NoBook>저장한 도서가 없습니다. 도서를 추가해주세요.</NoBook>
            )}
          </div>
          <div className="alert-box">{errorMessage}</div>
        </BookListContainer>
      ) : (
        <BeforeLoginModal>
          <div className="beforeLogin">로그인 후 사용해주세요.</div>
          <button onClick={() => navigate('/')}>로그인 화면으로 이동</button>
        </BeforeLoginModal>
      )}
    </div>
  );
}
