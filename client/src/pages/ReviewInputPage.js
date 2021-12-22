import ReviewInput from '../components/book/ReviewInput';
import styled from 'styled-components';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router';
import PageTitle from '../components/PageTitle';
const BeforeLoginModal = styled(Modal)``;
const ReviewInputPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BookInfoContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 40px;
  width: 60vw;
  height: 50rem;
  margin: auto;
  padding: 3rem;
  margin-top: 2rem;
`;
const BookInfoContent = styled.div`
  background-color: #f8efe1;
  border-radius: 10px;
  height: 30vh;
  padding: 1.5rem;
  margin: auto;
`;
const Thumbnail = styled.span`
  float: left;
  padding: 1rem;
`;

export default function ReviewInputPage({ bookInfo, isLogin, useTitle }) {
  const { title, thumbnail, contents } = bookInfo;
  const navigate = useNavigate();
  useTitle('북로그 감상입력');
  return (
    <ReviewInputPageContainer>
      {isLogin ? (
        <div>
          <BookInfoContainer>
            <PageTitle>감상 작성</PageTitle>
            <BookInfoContent>
              <Thumbnail>
                <img src={thumbnail} />
              </Thumbnail>
              <div className="booktitle">{title}</div>
              <hr />
              <div className="bookcontents">
                {contents.length === 0
                  ? '책에 대한 설명이 없습니다.'
                  : contents.length > 160
                  ? contents.slice(0, 160) + '...'
                  : contents}
              </div>
            </BookInfoContent>
            <ReviewInput bookInfo={bookInfo} />
          </BookInfoContainer>
        </div>
      ) : (
        <BeforeLoginModal>
          <div className="beforeLogin">로그인 후 사용해주세요.</div>
          <button onClick={() => navigate('/')} className="btn">
            로그인 화면으로 이동
          </button>
        </BeforeLoginModal>
      )}
    </ReviewInputPageContainer>
  );
}
