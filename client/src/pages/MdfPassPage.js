import ModifyPassword from '../components/user/ModifyPassword';

export default function MdfPassPage({ isLogin }) {
  return (
    <div>
      {isLogin ? (
        <div>
          {' '}
          <ModifyPassword />
        </div>
      ) : (
        <div className="beforeLogin">로그인 후 사용해주세요.</div>
      )}
    </div>
  );
}
