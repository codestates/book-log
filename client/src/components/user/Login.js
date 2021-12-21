import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
require('dotenv').config();

axios.defaults.withCredentials = true;

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
            navigate('/booklist');
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
    <div className="loginContainer">
      <center className="signIn">
        <h1>Sign In</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="inputField">
            <div> 이메일 </div>
            <input
              type="email"
              onChange={handleInputValue('email')}
              className="inputwidth"
            />
          </div>
          <div className="passwordField">
            <div>비밀번호</div>
            <input
              type="password"
              onChange={handleInputValue('password')}
              className="inputwidth"
            />
          </div>

          <button className="login btn" type="submit" onClick={loginRequest}>
            <span>로그인</span>
          </button>
          <div className="google btn">
            <input
              type="button"
              class="google-login-button"
              value="Sign in with google"
              onClick={googleLoginRequest}
            />
          </div>
        </form>
      </center>

      <div className="login-signupBox">
        <div>
          회원이 아니신가요?
          <Link to="/signup"> 회원가입</Link>
        </div>
      </div>

      <div className="alert-box">{errorMessage}</div>
    </div>
  );
}
