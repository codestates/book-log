import CheckPassword from '../components/user/CheckPassword';

export default function ChkPassPage({ isLogin }) {
  return (
    <div>
      {isLogin ? (
        <div>
          본인 확인을 위해 비밀번호를 입력해주세요.
          <CheckPassword />
        </div>
      ) : (
        <div className="beforeLogin">로그인 후 사용해주세요.</div>
      )}
    </div>
  );
}
