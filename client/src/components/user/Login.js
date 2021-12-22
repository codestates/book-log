import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
require('dotenv').config();

axios.defaults.withCredentials = true;

const LoginContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  width: 50vw;
  height: 60vh;
  border-radius: 40px;
  margin: 3rem auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 3rem;
  & > div {
    width: 70%;
    margin: 0 auto 10px;
  }
`;

const LoginSignupBox = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  padding-left: 1.7em;
  margin: 1rem;
`;

const BtnBox = styled.div`
  margin: 1rem;
`;
export default function Login({ handleLogin, handleUsername }) {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };
  const navigate = useNavigate();
  const loginRequest = () => {
    const { email, password } = loginInfo;
    if (!email || !password) {
      setErrorMessage('이메일과 비밀번호를 입력하세요');
    } else {
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/user/login/general`,
        data: {
          email,
          password,
        },
      })
        .then((result) => {
          if (result.status === 200) {
            const username = result.data.data.username;
            handleUsername(username);
            handleLogin();
            navigate('/booklist', { replace: true });
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setErrorMessage('이메일 또는 비밀번호가 틀렸습니다.');
          } else {
            setErrorMessage('서버에 문제가 있습니다. 잠시 후 시도해주세요.');
          }
        });
    }
  };

  const googleLoginRequest = async () => {
    const authURL = await axios({
      method: 'GET',
      url: `${process.env.REACT_APP_SERVER_URL}/auth/google`,
    })
      .then((result) => result.data)
      .catch((err) => {
        console.log(err);
      });
    window.location.href = authURL;
  };

  return (
    <LoginContainer>
      <center>
        <h1>Sign In</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="inputField">
            <input
              type="email"
              onChange={handleInputValue('email')}
              className="inputwidth"
              placeholder="이메일"
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
          <BtnBox>
            <div className="login btn" type="submit" onClick={loginRequest}>
              <span>로그인</span>
            </div>
          </BtnBox>
          <BtnBox>
            <div className="google btn" onClick={googleLoginRequest}>
              {/* <input
                type="button"
                class="google-login-button"
                value="Sign in with google"
              /> */}
              Sign in with google
            </div>
          </BtnBox>
        </form>
      </center>

      <LoginSignupBox>
        <div>
          회원이 아니신가요?
          <Link to="/signup"> 회원가입</Link>
        </div>
      </LoginSignupBox>

      <div className="alert-box">{errorMessage}</div>
    </LoginContainer>
  );
}
