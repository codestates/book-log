import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function TitleBar({ username, handleLogout }) {
  return (
    <div id="titleBar">
      <div id="barBox">
        <button className="bar logout" onClick={handleLogout}>
          <Link to="/">로그아웃</Link>
        </button>
        <button className="bar mypage">
          <Link to="/mypage">{username}님의 마이페이지</Link>
        </button>
      </div>
    </div>
  );
}
