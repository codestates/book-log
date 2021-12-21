import ReviewInput from '../components/book/ReviewInput';
import styled from 'styled-components';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router';
const BeforeLoginModal = styled(Modal)``;

export default function ReviewInputPage({ bookInfo, isLogin }) {
  const { title, thumbnail, contents } = bookInfo;
  const navigate = useNavigate();
  return (
    <div>
      {isLogin ? (
        <div>
          <div className="bookinfo">
            <img src={thumbnail} />
            <div className="booktitle">{title}</div>
            <div className="bookcontents">{contents}</div>
          </div>
          <ReviewInput bookInfo={bookInfo} />
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
