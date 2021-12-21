import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function TitleBar({ username, handleLogout, isLogin }) {
  return (
    <div id="titleBar">
      <div id="logo">
        {isLogin ? (
          <Link to="/review/book">BOOK LOG</Link>
        ) : (
          <Link to="/">BOOK LOG</Link>
        )}
      </div>
      <div className=" bar mypage">
        <Link to="/mypage">
          {username}님의 {'\n'}마이페이지
        </Link>
      </div>
      <div className=" bar logout">
        <div className="bar logout">
          <Link to="/" onClick={() => handleLogout()}>
            로그아웃
          </Link>
        </div>
      </div>
    </div>
  );
}
