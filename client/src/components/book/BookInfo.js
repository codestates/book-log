import React from 'react';
import styled from 'styled-components';

import BookCover from './BookCover';

const Cover = styled(BookCover)``;

const BookBox = styled.div`
  display: flex;
  padding-bottom: 0.6rem;
`;

const TitleInfo = styled.div`
  display: flex;
`;

const BookInfoContainer = styled.div`
  padding: 0.6rem 1rem;
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
  width: 45rem;
`;

const BookInfo = ({ book }) => {
  const { title, authors, publisher, datetime, contents } = book;
  const thumbnail = book.thumbnail
    ? book.thumbnail
    : `https://via.placeholder.com/120x174.png?text=Book+Log`;
  return (
    <BookBox>
      <Cover
        book={{
          thumbnail: thumbnail,
        }}
      />
      <BookInfoContainer>
        <TitleInfo>
          <BookTitle>
            {title.length < 35 ? title : title.slice(0, 35) + '...'}
          </BookTitle>
          <BookAuthor>{authors[0]}</BookAuthor>
          <BookPublisher>
            {publisher.length < 10 ? publisher : publisher.slice(0, 10) + '...'}
          </BookPublisher>
          <BookPublishDate>{' ' + datetime.slice(0, 10)}</BookPublishDate>
        </TitleInfo>
        <BookContents>
          {contents.length === 0 ? '소개 없음' : contents + ' ...'}
        </BookContents>
      </BookInfoContainer>
    </BookBox>
  );
};

export default BookInfo;
