import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BookInfoBox from '../components/book/BookInfoBox';
import Modal from '../components/Modal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 17rem;
`;

const TitleContainer = styled.div`
  width: 100%;
`;

const Title = styled.div`
  font-size: 1.7rem;
  font-weight: 700;
`;

const SearchContainer = styled.div`
  padding: 3rem 2.5rem;
`;

const BooksContainer = styled.div`
  width: 100%;
  background-color: white;
  height: 40rem;
  overflow-y: scroll;
  border-radius: 3px;
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  border-bottom: 2px solid black;
  padding: 0.3rem 0.5rem;
  font-size: 1.3rem;
  width: 30vw;
  outline: 0;
`;

const BookModal = styled(Modal)``;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const ModalContents = styled.div`
  display: flex;
`;
const ModalBtn = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

const ModalInfo = styled.div``;

const ModalTitle = styled.div`
  padding-bottom: 1rem;
  font-weight: 600;
`;

const ModalDetail = styled.div``;

const ModalCover = styled.img`
  padding-right: 1rem;
`;

const Button = styled.button`
  margin-right: 1.3rem;
  width: 7rem;
  height: 2rem;
`;

const SelectBookPage = ({ handleBookInfo }) => {
  const [bookList, setBookList] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedBook, setSelectedBook] = useState({});
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (search !== '') {
      searchBook(search);
    }
  }, [search]);

  const searchBook = async (search) => {
    const {
      data: { data },
    } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/book/search?title=${search}`,
      {
        headers: {
          withCredentials: true,
        },
      }
    );
    setBookList(data);
  };

  const handleChange = async (e) => {
    setSearch(e.target.value);
  };

  const clickHandler = (idx) => {
    setSelectedBook(bookList[idx]);
    setIsModal(true);
  };

  const buttonHandler = (type) => {
    if (type === 'back') {
      setIsModal(false);
    } else if (type === 'select') {
      handleBookInfo(selectedBook);
      navigate('/reviewinput');
    }
  };

  return (
    <Container>
      {isModal ? (
        <BookModal>
          <ModalContainer>
            <ModalContents>
              <ModalCover src={selectedBook.thumbnail} />
              <ModalInfo>
                <ModalTitle>
                  {selectedBook.title} | {selectedBook.authors[0]} |{' '}
                  {selectedBook.publisher}
                </ModalTitle>
                <ModalDetail>{selectedBook.contents}...</ModalDetail>
              </ModalInfo>
            </ModalContents>
            <ModalBtn>
              <Button onClick={() => buttonHandler('back')}>뒤로가기</Button>
              <Button onClick={() => buttonHandler('select')}>선택</Button>
            </ModalBtn>
          </ModalContainer>
        </BookModal>
      ) : null}
      <TitleContainer>
        <Title>도서 선택</Title>
      </TitleContainer>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="도서 제목을 입력하세요."
          value={search}
          onChange={handleChange}
        />
      </SearchContainer>
      <BooksContainer>
        {bookList.length > 0 ? (
          bookList.map((book, idx) => {
            return (
              <BookInfoBox book={book} idx={idx} clickHandler={clickHandler} />
            );
          })
        ) : (
          <div>검색 결과가 없습니다</div>
        )}
      </BooksContainer>
    </Container>
  );
};

export default SelectBookPage;
