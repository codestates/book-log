import React from 'react';
import { Link } from 'react-router-dom';

export default function MyPage() {
  return (
    <div className="mainMyPage">
      <div>
        <button className="btn-reset">
          <Link to="/checkpassword">비밀번호 변경</Link>
        </button>
      </div>
      <div>
        <button className="btn-withdrawal">
          <Link to="/withdrawal">탈퇴</Link>
        </button>
      </div>
    </div>
  );
}
