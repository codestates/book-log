import Login from '../components/user/Login';

export default function MainPage(props) {
  const { handleLogin, handleUsername } = props;
  props.useTitle('북로그 페이지');
  return (
    <div>
      <Login handleLogin={handleLogin} handleUsername={handleUsername} />
    </div>
  );
}
