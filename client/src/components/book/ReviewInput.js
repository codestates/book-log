import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

export default function ReviewInput() {
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
    if (!reviewContent.page || !reviewContent.content) {
      setErrorMessage('페이지수와 감상 내용 모두 입력해야합니다.');
    } else {
      axios({
        method: 'POST',
        url: 'http://localhost:4000/book/new',
        data: {
          title: '',
          contents: '',
          isbn: '',
          thumbnail: '',
          author: '',
          published_at: '',
          publisher: '',
          url: '',
          reviewContents: reviewContent.content,
          page: reviewContent.page,
        },
      })
        .then((result) => {
          if (result.status === 200) {
            navigate('/booklist/reviewlist');
          }
        })
        .catch((err) => {
          setErrorMessage('서버에 문제가 있습니다. 잠시 후 시도해주세요.');
        });
    }
  };
  return (
    <div>
      <div className="date-page">
        <span className="date-time">{today.toLocaleDateString()}</span>
        <div className="page-input">
          페이지수:
          <input type="text" onChange={reviewInputValue('page')} />
        </div>
      </div>
      <div className="review-input-btn">
        <input
          type="text"
          className="review-input"
          onChange={reviewInputValue('content')}
        />
        <button onClick={writeReview}>저장</button>
      </div>

      <div className="alert-box">{errorMessage}</div>
    </div>
  );
}
