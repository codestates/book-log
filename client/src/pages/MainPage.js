import Login from '../components/user/Login';

export default function MainPage(props) {
  const { handleLogin, handleUsername } = props;
  return (
    <div>
      <Login handleLogin={handleLogin} handleUsername={handleUsername} />
    </div>
  );
}
