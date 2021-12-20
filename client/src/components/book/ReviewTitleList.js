import React, { useState } from 'react';
import ReviewTitle from './ReviewTitle';

export default function ReviewTitleList({ reviewList, handleCurrentReviews }) {
  const booksReviews = reviewList.review_list || []; // 배열

  return (
    <div className="review-title-list">
      <button className="add-review">감상 추가</button>
      <div className="review-titles">
        {booksReviews.length !== 0
          ? booksReviews.map((book) => (
              <ReviewTitle
                key={book.page}
                book={book}
                handleCurrentReviews={handleCurrentReviews}
              />
            ))
          : '리뷰를 추가해주세요.'}
      </div>
    </div>
  );
}
