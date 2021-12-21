import React from 'react';
import { Link } from 'react-router-dom';

export default function MyPage() {
  return (
    <div>
      <div>
        <button className="btn btn-reset">
          <Link to="/checkpassword">비밀번호 변경</Link>
        </button>
      </div>
      <div>
        <button className="btn btn-withdrawal">
          <Link to="/withdrawal">탈퇴</Link>
        </button>
      </div>
    </div>
  );
}
