import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

const CheckButton = styled.div`
  padding: .5em;
  border-radius: 10px;
  background-color: rgba(41, 74, 105, 1);
  color: white;
  text-align: center;
  font-weight: 700;


  &:hover {
    cursor: pointer;
  }
`;

export default function CheckPassword() {
  const [checkPassword, setCheckPassword] = useState({
    password: '',
  });
  const handleInputValue = (key) => (e) => {
    setCheckPassword({ ...checkPassword, [key]: e.target.value });
  };
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const checkhandler = () => {
    const { password } = checkPassword;
    if (!password) {
      setErrorMessage('비밀번호를 입력해주세요.');
    } else {
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/user/password/check`,
        data: {
          password,
        },
      })
        .then((result) => {
          if (result.status === 200) {
            navigate('/modify', { replace: true });
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setErrorMessage('비밀번호가 틀렸습니다.');
          } else {
            setErrorMessage('서버에 문제가 있습니다. 잠시 후 시도해주세요.');
          }
        });
    }
  };
  return (
    <ContentContainer>
      <input
        type="password"
        onChange={handleInputValue('password')}
        placeholder="비밀번호"
      />
      <CheckButton onClick={checkhandler}>확인</CheckButton>
      <div className="alert-box" style={{ width: '100%' }}>
        {errorMessage}
      </div>
    </ContentContainer>
  );
}
