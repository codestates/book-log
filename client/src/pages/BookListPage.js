import React, { useState } from 'react';
import BookCover from '../components/book/BookCover';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageTitle from '../components/PageTitle';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router';
const BeforeLoginModal = styled(Modal)``;

const BookListContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  width: 60%;
  height: 50rem;
  border-radius: 40px;
  margin: auto;
  padding: 3rem;
  font-size: 14px;
  margin-top: 2rem;
`;
const NoBook = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -150px;
  margin-top: -150px;
  font-size: 15px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 2rem;
`;

const Button = styled.span`
  padding: 0.3rem 0.7rem;
  background-color: #0b3961;
  border-radius: 0.2rem;
`;

const AddLink = styled(Link)`
  text-decoration: none;
  line-height: 1.5rem;
  color: white;
`;

const BookContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 7rem);
  grid-gap: 0rem 2rem;
  padding: 2rem 2rem;
  margin-top: 2rem;
  overflow-y: scroll;
  height: 35rem;
  background-color: rgb(247, 237, 222, 0.9);
  border-radius: 0.3rem;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    padding: 1px;
  }
`;

const Cover = styled(BookCover)`
  border-radius: 0.3rem;
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
          <PageTitle>도서 목록</PageTitle>
          <ButtonRow>
            <Button className="add-bookbtn">
              <AddLink to="/review/book">도서 추가</AddLink>
            </Button>
          </ButtonRow>
          <BookContainer className="book-list">
            {bookList.length !== 0 ? (
              bookList.map((book) => (
                <Cover
                  key={book.book_id}
                  book={book}
                  handleCurrentbook={handleCurrentbook}
                  currentBook={currentBook}
                />
              ))
            ) : (
              <NoBook>저장한 도서가 없습니다. 도서를 추가해주세요.</NoBook>
            )}
          </BookContainer>
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
