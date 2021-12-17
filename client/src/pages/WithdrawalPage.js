import CheckPassword from '../components/user/CheckPassword';
import Withdrawal from '../components/user/Withdrawal';

export default function WithdrawalPage() {
  return (
    <div>
      <div>정말 탈퇴하시겠습니까? </div>
      <div>본인 확인을 위해 비밀번호를 입력해주세요.</div>
      <Withdrawal />
    </div>
  );
}
