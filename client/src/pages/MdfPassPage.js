import ModifyPassword from '../components/user/ModifyPassword';
import styled from 'styled-components';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router';
const BeforeLoginModal = styled(Modal)``;

export default function MdfPassPage({ isLogin }) {
  const navigate = useNavigate();
  return (
    <div>
      {isLogin ? (
        <div>
          {' '}
          <ModifyPassword />
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
