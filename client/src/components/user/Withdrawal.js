import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Withdrawal() {
  const [checkPassword, setCheckPassword] = useState({
    password: '',
  });
  const handleInputValue = (key) => (e) => {
    setCheckPassword({ ...checkPassword, [key]: e.target.value });
  };
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const requestWithdrawal = () => {
    const { password } = checkPassword;
    if (!password) {
      setErrorMessage('비밀번호를 입력해주세요.');
    } else {
      axios({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER_URL}/user/withdrawal`,
        data: { password },
      })
        .then((result) => {
          if (result.status === 200) {
            alert('탈퇴 완료하였습니다. Goodbye');
            navigate('/');
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            setErrorMessage('비밀번호가 틀렸습니다.');
          } else {
            setErrorMessage('서버에 문제가 있습니다. 잠시 후 시도해주세요.');
          }
        });
    }
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
