import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CheckPassword(props) {
  const { isLogin } = props;
  const [checkPassword, setCheckPassword] = useState({
    password: '',
  });
  const handleInputValue = (key) => (e) => {
    setCheckPassword({ ...checkPassword, [key]: e.target.value });
  };
  const [errorMessage, setErrorMessage] = useState('');
  const checkhandler = () => {
    const { password } = checkPassword;
    //axios 보내기
    //axios결과에 따라 erroMessage 변경하기(아래 Link 삭제해야함)
  };
  return (
    <div>
      <div className="passwordField">
        <span>비밀번호</span>
        <input type="password" onChange={handleInputValue('password')} />
      </div>
      <div className="btn-confirm">
        <button onClick={checkhandler}>
          <Link to="/modify">확인</Link>
        </button>
      </div>
      <div className="alert-box">{errorMessage}</div>
    </div>
  );
}
