import GoogleLogin from '../components/user/GoogleLogin';
import styled from 'styled-components';
import LogoImg from '../book-log-logo.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const GoogleLoginContainer = styled.div`
  width: 60%;
  background-color: rgba(255, 255, 255, 1);
  padding: 3rem;
  margin-top: 2rem;
  border-radius: 40px;
  font-size: 14px;
  text-align: center;
`;

export default function GoogleLoginPage(props) {
  const { handleLogin, handleUsername } = props;
  return (
    <Container>
      <GoogleLoginContainer>
        <img src={LogoImg} alt="logo" />
        <GoogleLogin handleLogin={handleLogin} handleUsername={handleUsername} />
      </GoogleLoginContainer>
    </Container>
  );
}
