import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Withdrawal() {
  const [checkPassword, setCheckPassword] = useState({
    password: '',
  });
  const handleInputValue = (key) => (e) => {
    setCheckPassword({ ...checkPassword, [key]: e.target.value });
  };
  const [errorMessage, setErrorMessage] = useState('');
  const requestWithdrawal = () => {
    const { password } = checkPassword;
    //만약 비밀번호가 다르면 setErrorMessage
    //axios로 탈퇴요청 보내기
  };
  return (
    <div>
      <div className="passwordField">
        <span>비밀번호</span>
        <input type="password" onChange={handleInputValue('password')} />
      </div>
      <div className="btn-withdrawal">
        <button onClick={requestWithdrawal}>탈퇴</button>
      </div>
      <div className="alert-box">{errorMessage}</div>
    </div>
  );
}
