import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BookInfoBox from '../components/book/BookInfoBox';

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
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  border-bottom: 2px solid black;
  padding: 0.3rem 0.5rem;
  font-size: 1.3rem;
  width: 30vw;
`;

const SelectBookPage = () => {
  const [bookList, setBookList] = useState([]);
  const [search, setSearch] = useState('');

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
  return (
    <Container>
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
          bookList.map((book) => {
            return <BookInfoBox book={book} />;
          })
        ) : (
          <div>검색 결과가 없습니다</div>
        )}
      </BooksContainer>
    </Container>
  );
};

export default SelectBookPage;
