import React, { useState } from 'react';
import axios from 'axios';
import Modal from '../Modal';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

export default function SignUp({ handleUsername }) {
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
  const navigate = useNavigate();

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
        url: `${process.env.REACT_APP_SERVER_URL}/user/signup/general`,
        data: {
          email,
          username,
          password,
        },
      })
        .then((result) => {
          if (result.status === 200) {
            console.log('@@@@@', result);
            setUserModal(true);
            const username = result.data.data.userInfo.username;
            handleUsername(username);
            navigate('/booklist');
          }
        })
        .catch((err) => {
          if (err.response.status === 409) {
            setErrorMessage('이미 동일한 이메일이 존재합니다.');
          } else {
            setErrorMessage('서버에 문제가 있습니다. 잠시 후 시도해주세요.');
          }
        });
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
