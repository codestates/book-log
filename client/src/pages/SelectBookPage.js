import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BookInfoBox from '../components/book/BookInfoBox';
import Modal from '../components/Modal';
import PageTitle from '../components/PageTitle';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding: 2rem 17rem;
  height: 100vh;
  margin-top: -0.3rem;
  background: rgba(255, 255, 255, 0.3); */
`;

const TitleContainer = styled.div`
  width: 100%;
`;

const SearchContainer = styled.div`
  padding: 3rem 2.5rem;
  text-align: center;
`;

const ContentContainer = styled.div`
  /* background: rgba(255, 255, 255); */
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  width: 60%;
  height: 50rem;
  padding: 3rem;
  margin-top: 2rem;
`;

const BooksContainer = styled.div`
  width: 100%;
  background-color: rgb(247, 237, 222, 0.9);
  padding: 0.7rem 1rem;
  height: 35rem;
  overflow-y: scroll;
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

const SearchInput = styled.input`
  border: none;
  background: none;
  border-bottom: 2px solid #2a4a69;
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
              <ModalCover
                src={
                  selectedBook.thumbnail
                    ? selectedBook.thumbnail
                    : 'https://user-images.githubusercontent.com/89366567/146297427-157c1ece-12f5-4d33-b198-d296275f7981.png'
                }
              />
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
      <ContentContainer>
        <TitleContainer>
          <PageTitle>도서 선택</PageTitle>
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
          {bookList.length > 0
            ? bookList.map((book, idx) => {
                return (
                  <BookInfoBox
                    book={book}
                    idx={idx}
                    clickHandler={clickHandler}
                  />
                );
              })
            : '검색 결과가 없습니다.'}
        </BooksContainer>
      </ContentContainer>
    </Container>
  );
};

export default SelectBookPage;
