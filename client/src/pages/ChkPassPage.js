import CheckPassword from '../components/user/CheckPassword';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Modal from '../components/Modal';
import axios from 'axios';
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
  padding: 3rem;
  margin-top: 2rem;
  border-radius: 40px;
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  margin-top: 3.5rem;
`;

export default function ChkPassPage({ isLogin, useTitle }) {
  const navigate = useNavigate();
  useTitle('북로그 비밀번호 확인');
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
    <Container>
      {isLogin ? (
        <ContentContainer>
          <TitleContainer>
            <PageTitle>비밀번호 변경</PageTitle>
          </TitleContainer>
          <Content>
            본인 확인을 위해 비밀번호를 입력해주세요.
            <CheckPassword />
          </Content>
        </ContentContainer>
      ) : (
        <BeforeLoginModal>
          <div className="beforeLogin">로그인 후 사용해주세요.</div>
          <button onClick={() => navigate('/')} className="btn">
            로그인 화면으로 이동
          </button>
        </BeforeLoginModal>
      )}
    </Container>
  );
}
