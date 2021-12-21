import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const TitleContainer = styled.div`
  width: 100%;
  height: 4rem;
  position: sticky;
  top: 0;
  display: grid;
  place-items: center;
  display: flex;
  background-color: #0b3961;
  z-index: 1;
  color: white;
`;

const Logo = styled.div`
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  padding: 1rem;
  flex: 7;
  &:hover {
    cursor: pointer;
  }
`;

const Bar = styled.div`
  float: right;
  font-size: 12px;
  z-index: -1;
  text-align: center;
  cursor: pointer;
  margin: 20px;
  flex: 1;
  white-space: pre-line;
`;
export default function TitleBar({ username, handleLogout, isLogin }) {
  return (
    <TitleContainer>
      <Logo>
        {isLogin ? (
          <Link
            to="/booklist"
            style={{ color: 'white', textDecoration: 'none' }}
          >
            BOOK LOG
          </Link>
        ) : (
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            BOOK LOG
          </Link>
        )}
      </Logo>
      {isLogin ? (
        <>
          <Bar>
            <Link
              to="/mypage"
              style={{
                color: 'white',
                zIndex: 2,
                textdecoration: 'none',
              }}
            >
              <h3>
                {username}님의 {'\n'}마이페이지
              </h3>
            </Link>
          </Bar>
          <Bar>
            <Link
              to="/"
              onClick={() => handleLogout()}
              style={{
                color: 'white',
                zIndex: 2,
                textdecoration: 'none',
              }}
            >
              <h3>로그아웃</h3>
            </Link>
          </Bar>
        </>
      ) : null}
    </TitleContainer>
  );
}
