import React, { useState } from 'react';
import { useNavigate, useResolvedPath } from 'react-router-dom';
import axios from 'axios';
import Modal from '../Modal';
import styled from 'styled-components';

const ContentContainer = styled.div`
  margin: auto;
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    width: 100%;
    margin: 0 auto 20px;
  }
`;

const Content = styled.div`
  max-width: 360px;
  height: 135px;
  margin: auto;
  font-size: 14px;
  text-align: center;

  & > * {
    width: 70%;
    margin: 0 auto 10px;
  }
`;

const WithdrawalButton = styled.div`
  padding: .5em;
  border-radius: 10px;
  background-color: rgba(228, 150, 127, 1);
  color: white;
  text-align: center;
  font-weight: 700;


  &:hover {
    cursor: pointer;
  }
`;

export default function Withdrawal({ handleUsername }) {
  const [checkPassword, setCheckPassword] = useState({
    password: '',
  });
  const handleInputValue = (key) => (e) => {
    setCheckPassword({ ...checkPassword, [key]: e.target.value });
  };
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [isModal, setModal] = useState(false);
  const requestWithdrawal = () => {
    const { password } = checkPassword;
    if (!password) {
      setErrorMessage('비밀번호를 입력해주세요.');
    } else {
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/user/withdrawal`,
        data: { password },
      })
        .then((result) => {
          if (result.status === 200) {
            setModal(true);
            // alert('탈퇴 완료하였습니다. Goodbye');
            handleUsername('guest');
            setTimeout(() => navigate('/', { replace: true }), 2000);
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setErrorMessage('비밀번호가 틀렸습니다.');
          } else if (err.response.status === 500) {
            setErrorMessage('서버에 문제가 있습니다. 잠시 후 시도해주세요.');
          } else {
            alert(err);
          }
        });
    }
  };
  return (
    <ContentContainer>
      {isModal ? (
        <div>
          <Modal>탈퇴 완료하였습니다. Goodbye</Modal>
        </div>
      ) : (
        <Content>
          <div>
            <strong>정말 탈퇴하시겠습니까?</strong> <br />
            본인 확인을 위해 <br />
            비밀번호를 입력해주세요.
          </div>
          <input
            type="password"
            onChange={handleInputValue('password')}
            placeholder="비밀번호"
          />
          <WithdrawalButton onClick={requestWithdrawal}>탈퇴</WithdrawalButton>
          <div className="alert-box">{errorMessage}</div>
        </Content>
      )}
    </ContentContainer>
  );
}
