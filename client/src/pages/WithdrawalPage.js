import Withdrawal from '../components/user/Withdrawal';
import styled from 'styled-components';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useEffect } from 'react';
const BeforeLoginModal = styled(Modal)``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const ContentContainer = styled.div`
  background-color: rgba(255, 255, 255, 1);
  padding: 3rem;
  margin-top: 2rem;
  border-radius: 40px;
  width: 60%;
`;

const PageTitle = styled.div`
  font-size: 1.7rem;
  font-weight: 700;
  padding-left: 1.2rem;
  margin: 0 0 10px;
`;

export default function WithdrawalPage(props) {
  const navigate = useNavigate();
  const { isLogin } = props;
  props.useTitle('북로그 탈퇴 페이지');
  const checkSocialRequest = () => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_SERVER_URL}/user/social/check`,
    }).catch((err) => {
      if (err.response.status === 500) {
        alert('서버에 문제가 있습니다. 잠시 후 시도해주세요.');
      } else {
        alert('구글 로그인 사용자는 이 기능을 이용하실 수 없습니다.');
      }
      navigate('/booklist');
    });
  };

  useEffect(() => {
    checkSocialRequest();
  }, []);

  return (
    <>
      {isLogin ? (
        <Container>
          <ContentContainer>
            <PageTitle>회원탈퇴</PageTitle>
            <Withdrawal
              handleUsername={props.handleUsername}
              handleLogout={props.handleLogout}
            />
          </ContentContainer>
        </Container>
      ) : (
        <BeforeLoginModal>
          <div className="beforeLogin">로그인 후 사용해주세요.</div>
          <button
            onClick={() => navigate('/', { replace: true })}
            className="btn"
          >
            로그인 화면으로 이동
          </button>
        </BeforeLoginModal>
      )}
    </>
  );
}
