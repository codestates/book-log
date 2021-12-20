import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
