import CheckPassword from '../components/user/CheckPassword';
import styled from 'styled-components';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router';
const BeforeLoginModal = styled(Modal)``;

export default function ChkPassPage({ isLogin }) {
  const navigate = useNavigate();
  return (
    <div>
      {isLogin ? (
        <div>
          본인 확인을 위해 비밀번호를 입력해주세요.
          <CheckPassword />
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
