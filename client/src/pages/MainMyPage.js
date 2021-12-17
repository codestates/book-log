import MyPage from '../components/user/MyPage';
import React, { useState } from 'react';

export default function MainMyPage({ isLogin }) {
  return (
    <div>
      {isLogin ? (
        <div>
          <MyPage />
        </div>
      ) : (
        <div className="beforeLogin">로그인 후 사용해주세요.</div>
      )}
    </div>
  );
}
//isLogin false일때 MainPage로 이동 필요
