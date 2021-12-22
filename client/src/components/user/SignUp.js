import React, { useState } from 'react';
import axios from 'axios';
import Modal from '../Modal';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
axios.defaults.withCredentials = true;

const SignUpModal = styled(Modal)``;

const SignUpContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  width: 50vw;
  height: 60vh;
  border-radius: 40px;
  margin: 3rem auto;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  & > div {
    width: 70%;
    margin: 0 auto 10px;
  }
`;
export default function SignUp({ handleUsername }) {
  const [signupInfo, setSignUpInfo] = useState({
    email: '',
    username: '',
    password: '',
    repassword: '',
  });
  const [usermodal, setUserModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleInputValue = (key) => (e) => {
    setSignUpInfo({ ...signupInfo, [key]: e.target.value });
  };
  const navigate = useNavigate();
  function email_check(str) {
    let reg =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return reg.test(str);
  }
  const handleSignUp = () => {
    const { email, username, password, repassword } = signupInfo;
    if (!email || !username || !password || !repassword) {
      setErrorMessage(
        '이메일, username, 2번의 비밀번호 모두 다 입력해야합니다.'
      );
    } else if (!email_check(email)) {
      setErrorMessage('올바른 이메일 형식을 입력해주세요.');
    } else if (password.length < 8 || repassword.length < 8) {
      setErrorMessage('비밀번호는 8글자 이상이어야합니다.');
    } else if (repassword !== password) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
    } else {
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/user/signup/general`,
        data: {
          email,
          username,
          password,
        },
      })
        .then((result) => {
          if (result.status === 201) {
            setUserModal(true);
            const username = result.data.data.userInfo.username;
            // handleUsername(username); 다시 로그인해야하므로 username 변경 안해도 됨
            setTimeout(() => navigate('/', { replace: true }), 3000);
          }
        })
        .catch((err) => {
          if (err.response.status === 409) {
            setErrorMessage('이미 동일한 이메일이 존재합니다.');
          } else {
            setErrorMessage('서버에 문제가 있습니다. 잠시 후 시도해주세요.');
          }
        });
    }
  };
  return (
    <>
      {usermodal ? (
        <SignUpModal>
          <br />
          <div>{signupInfo.username}님의 회원가입을 축하합니다!!!!</div>
          <br />
          <div>가입하신 정보로 로그인해주세요.</div>
          <br />
          <div> 잠시후 로그인 페이지로 이동합니다...</div>
          <br />
          <button onClick={() => navigate('/')} className="btn">
            로그인 화면 으로 이동
          </button>
        </SignUpModal>
      ) : null}
      <SignUpContainer>
        <center>
          <h2 id="signup-title">
            사용할 이메일, username, 비밀번호를 입력해주세요{' '}
          </h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="inputField">
              <input
                type="email"
                onChange={handleInputValue('email')}
                className="inputwidth"
                placeholder="이메일"
              />
            </div>
            <div className="inputField">
              <input
                type="text"
                onChange={handleInputValue('username')}
                className="inputwidth"
                placeholder="username"
              />
            </div>
            <div className="passwordField">
              <input
                type="password"
                onChange={handleInputValue('password')}
                className="inputwidth"
                placeholder="비밀번호"
              />
            </div>
            <div className="passwordField">
              <input
                type="password"
                onChange={handleInputValue('repassword')}
                className="inputwidth"
                placeholder="비밀번호 확인"
              />
            </div>
            <div className="btn" type="submit" onClick={handleSignUp}>
              SignUp
            </div>
            <div className="alert-box">{errorMessage}</div>
          </form>
        </center>
      </SignUpContainer>
    </>
  );
}
