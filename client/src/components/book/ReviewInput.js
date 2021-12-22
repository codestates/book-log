import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

axios.defaults.withCredentials = true;

const ReviewInputContainer = styled.div`
  background-color: #9fb7cd;
  border-radius: 10px;
  height: 25rem;
  margin: auto;
  padding: 2rem;
  margin-top: 1rem;
`;

const DateContainer = styled.div`
  height: 5vh;
  font-size: 0.8rem;
`;
const WritingContainer = styled.textarea`
  width: 100%;
  height: 15rem;
  font-size: 1rem;
`;
const PageInput = styled.div`
  float: right;
`;
export default function ReviewInput({ bookInfo }) {
  const today = new Date();

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [reviewContent, setReviewContent] = useState({
    content: '',
    page: '',
  });
  const reviewInputValue = (key) => (e) => {
    setReviewContent({ ...reviewContent, [key]: e.target.value });
  };
  const writeReview = () => {
    let regExp = /[^0-9]/g;
    let number = reviewContent.page.replace(regExp, '');
    if (reviewContent.page !== number) {
      setErrorMessage('페이지수는 숫자로만 입력해야합니다.');
    } else if (!reviewContent.page || !reviewContent.content) {
      setErrorMessage('페이지수와 감상 내용 모두 입력해야합니다.');
    } else {
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/book/new`,
        data: {
          ...bookInfo,
          published_at: bookInfo.datetime,
          author: bookInfo.authors[0],
          reviewContents: reviewContent.content,
          page: reviewContent.page,
        },
      })
        .then((result) => {
          if (result.status === 200) {
            navigate('/booklist/reviewlist', {
              state: { book_id: result.data.data.book_id },
            });
          }
        })
        .catch((err) => {
          setErrorMessage('서버에 문제가 있습니다. 잠시 후 시도해주세요.');
        });
    }
  };
  return (
    <ReviewInputContainer>
      <DateContainer>
        <span
          className="date-time"
          style={{ fontSize: '1rem', fontWeight: 'bold' }}
        >
          {today.toLocaleDateString()}
        </span>
        <PageInput>
          페이지수
          <input
            type="text"
            onChange={reviewInputValue('page')}
            id="page-input"
            style={{ width: '7vw' }}
          />
        </PageInput>
      </DateContainer>
      <WritingContainer
        type="text"
        className="review-input"
        placeholder="책을 읽고 느낌 감상을 자유롭게 남겨주세요."
        onChange={reviewInputValue('content')}
      />
      <button className="btn" onClick={writeReview} style={{ width: '6vw' }}>
        저장
      </button>
      <div className="alert-box">{errorMessage}</div>
    </ReviewInputContainer>
  );
}
