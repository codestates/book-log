import React from 'react';
import styled from 'styled-components';
import BookInfo from './BookInfo';

const BookBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #c7c1be;
  padding: 0.5rem 1rem;
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 1rem;
  }
`;

const Button = styled.button`
  padding: 0.3rem 0.7rem;
  background-color: #0b3961;
  border-radius: 0.2rem;
  text-decoration: none;
  line-height: 1.5rem;
  color: white;
  border: none;
`;

const BookInfoBox = ({ book, clickHandler, idx }) => {
  return (
    <BookBox>
      <BookInfo book={book}></BookInfo>
      <Button onClick={() => clickHandler(idx)}>선택</Button>
    </BookBox>
  );
};

export default BookInfoBox;
