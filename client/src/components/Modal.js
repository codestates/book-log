import React from 'react';
import { Link } from 'react-router-dom';

export default function UserModal({ username }) {
  return (
    <div className="user-modal">
      {username}님, 가입을 축하합니다.
      <button className="btn-usermodal">
        <Link to="/mypage">확인</Link>
      </button>
    </div>
  );
}
