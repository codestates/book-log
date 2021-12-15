import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function TitleBar(props) {
  const [username, setUsername] = useState('guest');
  if (props.username) {
    setUsername(props.username);
  }
  return (
    <div id="titleBar">
      <div id="barBox">
        <button className="bar mypage"> {username}님의 마이페이지 </button>
        <button className="bar logout"> 로그아웃 </button>
      </div>
    </div>
  );
}
