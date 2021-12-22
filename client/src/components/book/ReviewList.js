import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import axios from 'axios';
const CurrentreviewPage = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
`;

const ShowreivewContent = styled.div`
  border: 1px solid black;
  height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ReviewContent = styled.div``;

const Buttons = styled.div`
  padding-right: 10px;
  padding-bottom: 10px;
  display: flex;
  justify-content: flex-end;
`;
const Modify = styled.div`
  padding: 0.5em;
  border-radius: 10px;
  background-color: rgba(41, 74, 105, 1);
  color: white;
  text-align: center;
  font-weight: bold;
`;

const Delete = styled.div`
  padding: 0.5em;
  border-radius: 10px;
  background-color: rgba(228, 150, 127, 1);
  color: white;
  text-align: center;
  font-weight: bold;
  margin-left: 13px;
`;
export default function ReviewList({ currentReviews, reviewList }) {
  const [selectDate, setSelectDate] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  console.log(currentReviews);

  const handleSelectDate = (input) => {
    setSelectDate(input);
  };
  const navigate = useNavigate();

  const handleModifyReview = () => {
    navigate('/reviewinput', {
      state: {
        reviewList,
        reviewdata: { ...selectDate, page: currentReviews.page },
      },
    });
  };
  const handleDeleteRequest = () => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_SERVER_URL}/book/remove/`,
    })
      .then((result) => {
        if (result.status === 200) {
        }
      })
      .catch((err) => {
        setErrorMessage('서버에 문제가 있습니다. 잠시 후 시도해주세요.');
      });
  };
  return (
    <div className="current-review">
      <CurrentreviewPage>
        <div> {currentReviews.page} 페이지 </div>
        <div>
          {currentReviews.reviews.length !== 0
            ? currentReviews.reviews.map((item) => (
                <div onClick={() => handleSelectDate(item)}>
                  {item.created_at}
                </div>
              ))
            : '리뷰를 추가해주세요.'}
        </div>
      </CurrentreviewPage>
      <ShowreivewContent>
        <ReviewContent>{selectDate.review}</ReviewContent>
        <Buttons>
          <Modify onClick={() => handleModifyReview()}>수정</Modify>
          <Delete onClick={() => handleDeleteRequest()}>삭제</Delete>
        </Buttons>
        <div>{errorMessage}</div>
      </ShowreivewContent>
    </div>
  );
}
