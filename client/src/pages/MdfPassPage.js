import ModifyPassword from '../components/user/ModifyPassword';
import styled from 'styled-components';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router';
import axios from 'axios'
import { useEffect } from 'react';
const BeforeLoginModal = styled(Modal)``;

export default function MdfPassPage({ isLogin }) {
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
    <div>
      {isLogin ? (
        <div>
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
