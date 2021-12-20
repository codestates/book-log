import React from 'react';
import styled from 'styled-components';

import BookCover from './BookCover';

const Cover = styled(BookCover)``;

const BookBox = styled.div`
  display: flex;
`;

const TitleInfo = styled.div`
  display: flex;
`;

const BookInfoContainer = styled.div`
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

const BookPublishDate = styled.div`
  padding-left: 1rem;
  font-size: 0.9rem;
  line-height: 1.8rem;
`;

const BookContents = styled.div`
  width: 50rem;
`;

const BookInfo = ({ book }) => {
  const { thumbnail, title, authors, publisher, datetime, contents } = book;
  return (
    <BookBox>
      <Cover
        book={{
          thumbnail: thumbnail,
        }}
      />
      <BookInfoContainer>
        <TitleInfo>
          <BookTitle>{title}</BookTitle>
          <BookAuthor>{authors[0]}</BookAuthor>
          <BookPublisher>{publisher}</BookPublisher>
          <BookPublishDate>{' ' + datetime.slice(0, 10)}</BookPublishDate>
        </TitleInfo>
        <BookContents>
          {contents.length === 0 ? '소개 없음' : contents}
        </BookContents>
      </BookInfoContainer>
    </BookBox>
  );
};

export default BookInfo;
