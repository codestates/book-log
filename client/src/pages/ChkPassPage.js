import CheckPassword from '../components/user/CheckPassword';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import Modal from '../components/Modal';

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

const ContentContainer = styled.div`
  margin: auto;
  padding: 3em;
  display: flex;
  align-items: center;
  border-radius: 40px;
  background-color: rgba(255, 255, 255, 0.9);
`;

const Content = styled.div`
  max-width: 360px;
  height: 180px;
  margin: auto;
  font-size: 14px;
  text-align: center;
`;

export default function ChkPassPage({ isLogin }) {
  const navigate = useNavigate();
  return (
    <PageContainer>
      <PageTitle>
        비밀번호 변경
      </PageTitle>
      {isLogin ? (
        <ContentContainer>
          <Content>
            본인 확인을 위해 비밀번호를 입력해주세요.
          <CheckPassword />
          </Content>
        </ContentContainer>
      ) : (
        <BeforeLoginModal>
          <div className="beforeLogin">로그인 후 사용해주세요.</div>
          <button onClick={() => navigate('/')}>로그인 화면으로 이동</button>
        </BeforeLoginModal>
      )}
    </PageContainer>
  );
}
