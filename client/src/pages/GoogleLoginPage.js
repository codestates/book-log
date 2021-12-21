import GoogleLogin from '../components/user/GoogleLogin';
import styled from 'styled-components';
import LogoImg from '../book-log-logo.png'

const GoogleLoginContainer = styled.div`
  width: 500px;
  height: 500px;
  margin: auto;
  padding: 3em;
  border-radius: 40px;
  background-color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  text-align: center;
`;

export default function GoogleLoginPage(props) {
  const { handleLogin, handleUsername } = props;
  return (
    <GoogleLoginContainer>
      <img src={LogoImg} alt="logo" />
      <GoogleLogin handleLogin={handleLogin} handleUsername={handleUsername} />
    </GoogleLoginContainer>
  );
}
