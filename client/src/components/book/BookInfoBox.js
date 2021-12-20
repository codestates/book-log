import React from 'react';
import styled from 'styled-components';

import BookCover from './BookCover';

const Cover = styled(BookCover)``;

const BookBox = styled.div`
  display: flex;
  justify-content: center;
`;

const TitleInfo = styled.div`
  display: flex;
`;

const BookInfo = styled.div`
  width: 70%;
  padding: 0.6rem 1.8rem;
  padding-right: -3rem;
`;

const BookTitle = styled.div`
  font-weight: 600;
`;

const BookAuthor = styled.div`
  padding-left: 0.7rem;
`;

const BookPublisher = styled.div`
  padding-left: 0.7rem;
`;

const BookPublishDate = styled.div``;

const BookContents = styled.div``;

const BookInfoBox = ({ book }) => {
  const { thumbnail, title, authors, publisher, datetime, contents } = book;

  return (
    <BookBox>
      <Cover
        book={{
          thumbnail: thumbnail,
        }}
      />
      <BookInfo>
        <TitleInfo>
          <BookTitle>{title}</BookTitle>
          <BookAuthor>{authors[0]}</BookAuthor>
          <BookPublisher>{publisher}</BookPublisher>
        </TitleInfo>
        <BookPublishDate>{datetime.slice(0, 10)}</BookPublishDate>
        <BookContents>{contents}</BookContents>
      </BookInfo>
    </BookBox>
  );
};

export default BookInfoBox;
