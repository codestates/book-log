import MyPage from '../components/user/MyPage';
import React, { useEffect } from 'react';
import axios from 'axios'
import styled from 'styled-components';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router';
import PageTitle from '../components/PageTitle';

const BeforeLoginModal = styled(Modal)``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const TitleContainer = styled.div`
  width: 100%;
`;

const ContentContainer = styled.div`
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  width: 60%;
  padding: 3rem;
  margin-top: 2rem;
`;

export default function MainMyPage({ isLogin }) {
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
    <Container>
      <ContentContainer>
        <TitleContainer>
          <PageTitle>
            마이페이지
          </PageTitle>
        </TitleContainer>
        {isLogin ? (
          <MyPage />
        ) : (
          <BeforeLoginModal>
            <div className="beforeLogin">로그인 후 사용해주세요.</div>
            <button onClick={() => navigate('/')}>로그인 화면으로 이동</button>
          </BeforeLoginModal>
        )}
      </ContentContainer>
    </Container>
  );
}
//isLogin false일때 MainPage로 이동 필요
