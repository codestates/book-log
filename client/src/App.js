import React, { useState, useEffect } from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import TitleBar from './components/TitleBar';
import SignUpPage from './pages/SignUpPage';
import MainMyPage from './pages/MainMyPage';
import ChkPassPage from './pages/ChkPassPage';
import WithdrawalPage from './pages/WithdrawalPage';
import MdfPassPage from './pages/MdfPassPage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookListPage from './pages/BookListPage';
import ReviewListPage from './pages/ReviewListPage';
import SelectBookPage from './pages/SelectBookPage';
import ReviewInputPage from './pages/ReviewInputPage';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState('guest');
  const handleLogin = () => {
    setIsLogin(true);
  };
  const handleLogout = () => {
    setIsLogin(false);
    setUsername('guest');
  };
  const handleUsername = (input) => {
    setUsername(input);
  };

  return (
    <div className="App">
      <Router>
        <TitleBar username={username} handleLogout={handleLogout} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <MainPage
                handleLogin={handleLogin}
                handleUsername={handleUsername}
              />
            }
          ></Route>
          <Route
            exact
            path="/signup"
            element={<SignUpPage handleUsername={handleUsername} />}
          ></Route>
          <Route
            exact
            path="/mypage"
            element={<MainMyPage isLogin={isLogin} />}
          ></Route>
          <Route
            exact
            path="/checkpassword"
            element={<ChkPassPage isLogin={isLogin} />}
          ></Route>
          <Route exact path="/withdrawal" element={<WithdrawalPage />}></Route>

          <Route
            exact
            path="/modify"
            element={<MdfPassPage isLogin={isLogin} />}
          ></Route>
          <Route exact path="/booklist" element={<BookListPage />}></Route>
          <Route
            exact
            path="/booklist/reviewlist"
            element={<ReviewListPage />}
          ></Route>
          <Route exact path="/review/book" element={<SelectBookPage />}></Route>
          <Route path="/reviewinput" element={<ReviewInputPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export { App as default, MainPage };
