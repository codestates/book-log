import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

const ModifyButton = styled.div`
  margin: auto;
  padding: .5em;
  border-radius: 10px;
  background-color: rgba(228, 150, 127, 1);
  color: white;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

const ContentContainer = styled.div`
  margin: auto;
  padding: 3em;
  align-items: center;
  border-radius: 40px;
  background-color: rgba(255, 255, 255, 0.9);
`;

const Content = styled.div`
  max-width: 360px;
  height: 180px;
  margin: auto;
  font-size: 14px;
  text-align: center;

  & > * {
    width: 70%;
    margin: 0 auto 10px;
  }
  
  & > input, ${ModifyButton} {
    width: 50%;
  }
`;



export default function ModifyPassword() {
  const [modify, setModify] = useState({
    password: '',
    repassword: '',
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const handleInputValue = (key) => (e) => {
    setModify({ ...modify, [key]: e.target.value });
  };
  const transferPassword = () => {
    const { password, repassword } = modify;
    if (!password || !repassword) {
      setErrorMessage('비밀번호를 입력해주세요.');
    } else if (password.length < 8 || repassword.length < 8) {
      setErrorMessage('비밀번호는 8자리 이상이어야합니다.');
    } else if (password !== repassword) {
      setErrorMessage('비밀번호가 일치 하지 않습니다.');
    } else {
      axios({
        method: 'PATCH',
        url: `${process.env.REACT_APP_SERVER_URL}/user/password/new`,
        data: {
          password,
        },
      })
        .then((result) => {
          if (result.status === 200) {
            alert('비밀번호를 변경하였습니다.');
            navigate('/booklist');
          }
        })
        .catch((err) => {
          if (err.response.status === 409) {
            setErrorMessage(
              '이전 비밀번호와 같습니다. 다른 비밀번호를 사용해주세요.'
            );
          } else {
            setErrorMessage('서버에 문제가 있습니다. 잠시 후 시도해주세요.');
          }
        });
    }
  };
  return (
    <PageContainer>
      <PageTitle>
        비밀번호 변경
      </PageTitle>
      <ContentContainer>
        <Content>
          <div>새로운 비밀번호를 입력해주세요.</div>
          <input type="password" onChange={handleInputValue('password')} placeholder='비밀번호'/><br/>
          <input type="password" onChange={handleInputValue('repassword')} placeholder='비밀번호 확인'/>
          <ModifyButton onClick={transferPassword}>
            변경
          </ModifyButton>
          <div className="alert-box">{errorMessage}</div>
        </Content>
      </ContentContainer>
    </PageContainer>
  );
}
