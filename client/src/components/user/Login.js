import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true;

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };
  const handleLogin = () => {
    const { email, password } = loginInfo;
    if (!email || !password) {
      setErrorMessage('이메일과 비밀번호를 입력하세요');
    }
    //else 라면, 로그인 요청 axios로 보내기
  };

  return (
    <div className="loginContainer">
      <center>
        <h1>Sign In</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="inputField">
            <span>이메일</span>
            <input type="email" onChange={handleInputValue('email')} />
          </div>
          <div className="passwordField">
            <span>비밀번호</span>
            <input type="password" onChange={handleInputValue('password')} />
          </div>
          <button className="btn-login" type="submit" onClick={handleLogin}>
            <Link to="/booklist">로그인</Link>
          </button>
          <div className="alert-box">{errorMessage}</div>
        </form>
        <div className="signupBox">
          <div className="signupBox">
            <Link to="/signup"> 회원가입</Link>
          </div>
          <div className="signupBox">Google이메일로 회원가입</div>
        </div>
      </center>
    </div>
  );
}
