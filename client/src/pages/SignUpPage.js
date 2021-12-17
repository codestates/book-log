import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SignUp from '../components/user/SignUp';

axios.defaults.withCredentials = true;

export default function SignUpPage() {
  return (
    <div>
      <SignUp />
    </div>
  );
}
