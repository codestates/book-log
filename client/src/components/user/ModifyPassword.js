import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import PageTitle from '../PageTitle';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const TitleContainer = styled.div`
  width: 100%;
`;

const ModifyButton = styled.div`
  width: 100%;
  margin: auto;
  padding: .5em;
  border-radius: 10px;
  background-color: rgba(41, 74, 105, 1);
  color: white;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

const ContentContainer = styled.div`
  background-color: rgba(255, 255, 255, 1);
  padding: 3rem;
  margin-top: 2rem;
  border-radius: 40px;
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  margin-top: 2.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    width: 100%;
  }
  & > div {
    margin: 20px auto;
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
    <Container>
      <ContentContainer>
        <TitleContainer>
          <PageTitle>
            비밀번호 변경
          </PageTitle>
        </TitleContainer>
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
    </Container>
  );
}
