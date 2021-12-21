import React, { useState } from 'react';

export default function ReviewList({ currentReviews }) {
  const [selectDate, setSelectDate] = useState({});

  const handleSelectDate = (input) => {
    setSelectDate(input);
  };

  return (
    <div className="current-review">
      <div className="current-reviewpage">
        {currentReviews.page}
        <div>
          {currentReviews.reviews.length !== 0
            ? currentReviews.reviews.map((item) => (
                <div onClick={() => handleSelectDate(item)}>
                  {item.created_at}
                </div>
              ))
            : '리뷰를 추가해주세요.'}
        </div>
      </div>
      <div className="show-reviewcontent">
        <div>{selectDate.review}</div>
        <button className="add-review">수정</button>
        <button className="delete-review">삭제</button>
      </div>
    </div>
  );
}
