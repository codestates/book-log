import React, { useState } from 'react';
import ReviewTitle from './ReviewTitle';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ReviewtitleList = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
`;

const Titles = styled.div`
  flex-grow: 1;
`;
const Pages = styled.div`
  padding-top: 15px;
  padding-left: 20px;
  border: 1px solid black;
  width: 100%;
  height: 170px;
`;

const Addreviewbtn = styled.div`
  border-radius: 10px;
  background-color: rgba(41, 74, 105, 1);
  color: white;
  text-align: center;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 20px;
`;
export default function ReviewTitleList({ reviewList, handleCurrentReviews }) {
  const booksReviews = reviewList.review_list || []; // 배열

  return (
    <ReviewtitleList>
      <Titles>
        <div className="page">페이지</div>
        <Pages>
          {booksReviews.length !== 0
            ? booksReviews.map((book) => (
                <ReviewTitle
                  key={book.page}
                  book={book}
                  handleCurrentReviews={handleCurrentReviews}
                />
              ))
            : '리뷰를 추가해주세요.'}
        </Pages>
      </Titles>

      <Link to="/reviewinput">
        <Addreviewbtn>작성하기</Addreviewbtn>
      </Link>
    </ReviewtitleList>
  );
}
