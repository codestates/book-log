import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const GoogleLoginInfo = styled.div`
  width: 200px;
  height: 200px;
  margin: 10px auto;
`;

export default function GoogleLogin({ handleLogin, handleUsername }) {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    setUsername(url.searchParams.get('username'));
    handleLogin(true)
    handleUsername(url.searchParams.get('username'))
    setTimeout(() => {
      navigate('/booklist')
    }, 3000);
  }, []);

  return (
    <GoogleLoginInfo>
      환영합니다 {username}님 <br />
      3초 후 이동됩니다
    </GoogleLoginInfo>
  );
}
