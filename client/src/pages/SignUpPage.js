import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SignUp from '../components/user/SignUp';
import styled from 'styled-components';

axios.defaults.withCredentials = true;

export default function SignUpPage(props) {
  const { handleUsername } = props;
  props.useTitle('북로그 회원가입 페이지');
  return (
    <div>
      <SignUp handleUsername={handleUsername} />
    </div>
  );
}
