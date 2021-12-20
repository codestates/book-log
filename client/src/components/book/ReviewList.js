import React from 'react';

export default function ReviewList({ currentReviews }) {
  return (
    <div className="review-createdats">
      <div className="current-reviewpage">{currentReviews.page}</div>
      <button className="add-review">감상 수정</button>
      <button className="delete-review">감상 삭제</button>
      <div className="review-createdat-list">
        {currentReviews.reviews.length !== 0
          ? currentReviews.reviews.map((title) => (
              <div className="created-at">{title.created_at}</div>
            ))
          : '리뷰를 추가해주세요.'}
      </div>
    </div>
  );
}
