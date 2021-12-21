import MyPage from '../components/user/MyPage';
import React, { useState } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 40px;
  margin: auto;
  padding: 3em;
  background-color: rgba(255, 255, 255, 0.7);
  overflow: hidden;
`;

const PageTitle = styled.div`
  margin: 0 0 10px;
  padding: .5em;
  font-size: 30px;
`;

export default function MainMyPage({ isLogin }) {
  return (
    <PageContainer>
      <PageTitle>
        마이페이지
      </PageTitle>
      {isLogin ? (
        <MyPage />
      ) : (
        <div className="beforeLogin">로그인 후 사용해주세요.</div>
      )}
    </PageContainer>
  );
}
//isLogin false일때 MainPage로 이동 필요
