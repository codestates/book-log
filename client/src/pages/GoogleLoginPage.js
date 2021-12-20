import GoogleLogin from '../components/user/GoogleLogin';

export default function GoogleLoginPage(props) {
  const { handleLogin, handleUsername } = props;
  return (
    <div>
      <GoogleLogin handleLogin={handleLogin} handleUsername={handleUsername} />
    </div>
  );
}
