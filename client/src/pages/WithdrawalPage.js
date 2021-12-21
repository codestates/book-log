import Withdrawal from '../components/user/Withdrawal';
import styled from 'styled-components';

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

export default function WithdrawalPage() {
  return (
    <PageContainer>
      <PageTitle>
        회원탈퇴
      </PageTitle>
      <Withdrawal />
    </PageContainer>
  );
}
