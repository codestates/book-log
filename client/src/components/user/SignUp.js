import React, { useState } from 'react';
import axios from 'axios';
import Modal from '../Modal';

axios.defaults.withCredentials = true;

export default function SignUp() {
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
  const handleSignUp = () => {
    const { email, username, password, repassword } = signupInfo;
    if (!email || !username || !password || !repassword) {
      setErrorMessage(
        '이메일, username, 2번의 비밀번호 모두 다 입력해야합니다.'
      );
    } else if (password.length < 8 || repassword.length < 8) {
      setErrorMessage('비밀번호는 8글자 이상이어야합니다.');
    } else if (repassword !== password) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
    } else {
      axios({
        method: 'POST',
        url: 'http://localhost:4000/user/singup',
        data: {
          email,
          username,
          password,
        },
      })
        .then((result) => {
          if (result.status === 201) {
            setUserModal(true);
          }
        })
        .catch((err) => alert(err));
    }
  };
  return (
    <div className="signUpContainer">
      <center>
        <h1> 사용할 이메일, username, 비밀번호를 입력해주세요 </h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="inputField">
            <span>Email</span>
            <input type="email" onChange={handleInputValue('email')} />
          </div>
          <div className="inputField">
            <span> username</span>
            <input type="text" onChange={handleInputValue('username')} />
          </div>
          <div className="passwordField">
            <span>비밀번호</span>
            <input type="password" onChange={handleInputValue('password')} />
          </div>
          <div className="passwordField">
            <span>비밀번호 확인</span>
            <input type="password" onChange={handleInputValue('repassword')} />
          </div>
          <button className="btn-signup" type="submit" onClick={handleSignUp}>
            SignUp
          </button>
          <div className="alert-box">{errorMessage}</div>
          {usermodal ? <Modal username={signupInfo.username} /> : ''}
        </form>
      </center>
    </div>
  );
}
