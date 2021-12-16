import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ModifyPassword() {
  const [modify, setModify] = useState({
    password: '',
    repassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const handleInputValue = (key) => (e) => {
    setModify({ ...modify, [key]: e.target.value });
  };

  const transferPassword = () => {
    const { password, repassword } = modify;
    if (password.length < 8 || repassword.length < 8) {
      setErrorMessage('비밀번호는 8자리 이상이어야합니다.');
    } else if (password !== repassword) {
      setErrorMessage('비밀번호가 일치 하지 않습니다.');
    }
    //else라면, 이전비밀번호와 다른지 확인후, axios로 변경된 비밀번호 보내기
  };
  return (
    <div>
      새로운 비밀번호를 입력해주세요.
      <div className="passwordField">
        <span>비밀번호</span>
        <input type="password" onChange={handleInputValue('password')} />
      </div>
      <div className="passwordField">
        <span>비밀번호 확인</span>
        <input type="password" onChange={handleInputValue('repassword')} />
      </div>
      <button className="btn-modify" type="submit" onClick={transferPassword}>
        변경
      </button>
      <div className="alert-box">{errorMessage}</div>
    </div>
  );
}
