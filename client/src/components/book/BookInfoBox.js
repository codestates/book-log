import React from 'react';
import styled from 'styled-components';
import BookInfo from './BookInfo';

const BookBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  margin: 1rem 1rem;
`;

const BookInfoContainer = styled(BookInfo)`
  padding: 0.6rem 3rem;
  padding-right: -3rem;
`;

const Button = styled.button`
  height: 2rem;
  width: 3rem;
`;

const BookInfoBox = ({ book, clickHandler, idx }) => {
  return (
    <BookBox>
      <BookInfoContainer book={book}></BookInfoContainer>
      <Button onClick={() => clickHandler(idx)}>선택</Button>
    </BookBox>
  );
};

export default BookInfoBox;
