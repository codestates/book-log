import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        url: 'http://localhost:4000/user/password/check',
        data: {
          password,
        },
      })
        .then((result) => {
          if (result.status === 200) {
            navigate('/modify');
          } else if (result.status === 401) {
            alert('비밀번호가 틀렸습니다.');
          } else {
            alert('서버에 문제가 있습니다. 잠시 후 시도해주세요.');
          }
        })
        .catch((err) => alert(err));
    }
  };
  return (
    <div>
      <div className="passwordField">
        <span>비밀번호</span>
        <input type="password" onChange={handleInputValue('password')} />
      </div>
      <div className="btn-confirm">
        <button onClick={checkhandler}>확인</button>
      </div>
      <div className="alert-box">{errorMessage}</div>
    </div>
  );
}
