import Withdrawal from '../components/user/Withdrawal';
import styled from 'styled-components';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router';
import axios from 'axios'
import { useEffect } from 'react';
const BeforeLoginModal = styled(Modal)``;

const PageContainer = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 40px;
  margin: auto;
  padding: 3em;
  background-color: rgba(255, 255, 255, 0.7);
  overflow: hidden;
`;

const PageTitle = styled.div`
  font-size: 1.7rem;
  font-weight: 700;
  padding-left: 1.2rem;
  margin: 0 0 10px;
`;

export default function WithdrawalPage({ isLogin }) {
  const navigate = useNavigate();

  const checkSocialRequest = () => {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_SERVER_URL}/user/social/check`,
    })
      .catch((err) => {
        if (err.response.status === 500) {
          alert('서버에 문제가 있습니다. 잠시 후 시도해주세요.');
        } else {
          alert('구글 로그인 사용자는 이 기능을 이용하실 수 없습니다.');
        }
        navigate('/booklist')
      });
  };

  useEffect(() => {
    checkSocialRequest()
  }, [])

  return (
    <>
      {isLogin ? (
       <PageContainer>
          <PageTitle>
            회원탈퇴
          </PageTitle>
          <Withdrawal /> 
       </PageContainer>
      ) : (
        <BeforeLoginModal>
          <div className="beforeLogin">로그인 후 사용해주세요.</div>
          <button onClick={() => navigate('/')}>로그인 화면으로 이동</button>
        </BeforeLoginModal>
      )}
    </>
  );
}
