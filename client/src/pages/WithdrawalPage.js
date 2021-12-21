import CheckPassword from '../components/user/CheckPassword';
import Withdrawal from '../components/user/Withdrawal';
import styled from 'styled-components';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router';
const BeforeLoginModal = styled(Modal)``;

export default function WithdrawalPage({ isLogin }) {
  const navigate = useNavigate();
  return (
    <div>
      {isLogin ? (
        <div>
          <div>정말 탈퇴하시겠습니까? </div>
          <div>본인 확인을 위해 비밀번호를 입력해주세요.</div>
          <Withdrawal />
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
