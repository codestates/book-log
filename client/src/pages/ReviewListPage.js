import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewTitleList from '../components/book/ReviewTitleList';
import ReviewList from '../components/book/ReviewList';
import { useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';
import Modal from '../components/Modal';
const BeforeLoginModal = styled(Modal)``;

const ReviewListPageContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  width: 500px;
  height: 500px;
  border-radius: 40px;
  margin: auto;
  padding: 3em;
  font-size: 14px;
`;

export default function ReviewListPage({ currentBook, isLogin }) {
  const { state } = useLocation();
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const bookId = currentBook.book_id || state.book_id;
  console.log(currentBook.book_id);
  console.log(`${process.env.REACT_APP_SERVER_URL}/book/${bookId}/review`);

  const [errorMessage, setErrorMessage] = useState('');
  const [reviewList, setReviewList] = useState({});
  const [currentReviews, setCurrentReviews] = useState({
    page: '',
    reviews: [],
  });

  const handleCurrentReviews = (input) => {
    setCurrentReviews(input);
  };

  const reviewListRequest = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_SERVER_URL}/book/${bookId}/review`,
    })
      .then((result) => {
        if (result.status === 200) {
          setReviewList(result.data.data); // 해당 도서의 리뷰리스트 가져오기(객체)
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          setErrorMessage('서버에 문제가 있습니다. 잠시 후 시도해주세요.');
        }
      });
  };
  useEffect(() => {
    reviewListRequest();
  }, []);
  console.log(reviewList);

  return (
    <div>
      {isLogin ? (
        <div className="reviewlistBox">
          <ReviewListPageContainer>
            <div className="review-book-thumbnail">
              <img
                width="10%"
                height="10%"
                src={
                  reviewList.book_data ? reviewList.book_data.thumbnail : null
                }
              />
            </div>
            <div className="reviewtitles">
              <ReviewTitleList
                reviewList={reviewList}
                handleCurrentReviews={handleCurrentReviews}
              />
            </div>
            <div className="review-createdat">
              <ReviewList currentReviews={currentReviews} />
            </div>
            <div className="alert-box">{errorMessage}</div>
          </ReviewListPageContainer>
        </div>
      ) : (
        <BeforeLoginModal>
          <div className="beforeLogin">로그인 후 사용해주세요.</div>
          <button onClick={() => navigate('/')}>로그인 화면으로 이동</button>
        </BeforeLoginModal>
      )}
    </div>
  );
}
