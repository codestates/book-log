import React, { useState } from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import TitleBar from './components/TitleBar';
import SignUpPage from './pages/SignUpPage';
import MainMyPage from './pages/MainMyPage';
import ChkPassPage from './pages/ChkPassPage';
import WithdrawalPage from './pages/WithdrawalPage';
import MdfPassPage from './pages/MdfPassPage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="App">
      <Router>
        <TitleBar />
        <Routes>
          <Route exact path="/" element={<MainPage />}></Route>
          <Route exact path="/signup" element={<SignUpPage />}></Route>
          <Route exact path="/logout" element={<MainPage />}></Route>
          <Route exact path="/mypage" element={<MainMyPage />}></Route>
          <Route exact path="/checkpassword" element={<ChkPassPage />}></Route>
          <Route exact path="/withdrawal" element={<WithdrawalPage />}></Route>
          <Route exact path="/modify" element={<MdfPassPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export { App as default, MainPage };
