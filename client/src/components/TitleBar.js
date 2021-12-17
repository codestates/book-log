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
        <button className="bar logout">
          <Link to="/logout">로그아웃</Link>
        </button>
        <button className="bar mypage">
          <Link to="/mypage">{username}님의 마이페이지</Link>
        </button>
      </div>
    </div>
  );
}
