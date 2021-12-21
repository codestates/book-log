import Withdrawal from '../components/user/Withdrawal';
import styled from 'styled-components';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router';
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
  margin: 0 0 10px;
  padding: .5em;
  font-size: 30px;
`;

export default function WithdrawalPage({ isLogin }) {
  const navigate = useNavigate();
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
