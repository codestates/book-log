import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ContentContainer = styled.div`
  margin: auto;
  padding: 3em;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div {
    width: 80%;
    margin: 0 auto 20px;
  }
`;

const CheckpasswordLinkButton = styled.div`
  margin: auto;
  padding: 0.5em;
  border-radius: 10px;
  background-color: rgba(41, 74, 105, 1);
  color: white;
  text-align: center;
  font-weight: 700;
  &:hover {
    cursor: pointer;
  }
`;

const WithdrawalLinkButton = styled.div`
  margin: auto;
  padding: 0.5em;
  border-radius: 10px;
  background-color: rgba(228, 150, 127, 1);
  color: white;
  text-align: center;
  font-weight: 700;
  &:hover {
    cursor: pointer;
  }
`;

export default function MyPage() {
  const navigate = useNavigate();

  const handleClick = (e) => {
    const href = e.target.attributes.value.nodeValue;
    navigate(`/${href}`);
  };
  return (
    <ContentContainer>
      <CheckpasswordLinkButton
        value="checkpassword"
        onClick={(e) => {
          handleClick(e);
        }}
        style={{ width: '25vw' }}
      >
        비밀번호 변경
      </CheckpasswordLinkButton>
      <WithdrawalLinkButton
        value="withdrawal"
        onClick={(e) => {
          handleClick(e);
        }}
        style={{ width: '25vw' }}
      >
        탈퇴
      </WithdrawalLinkButton>
    </ContentContainer>
  );
}
