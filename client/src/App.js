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
import GoogleLoginPage from './pages/GoogleLoginPage';

function App() {
  const [isLogin, setIsLogin] = useState('');

  const [username, setUsername] = useState('guest');

  const [bookInfo, setBookInfo] = useState({});

  const [currentBook, setCurrentBook] = useState({});

  const useTitle = () => {
    const [title, setTitle] = useState('북로그');
    const updateTitle = () => {
      const htmlTitle = document.querySelector('title');
      htmlTitle.innerText = title;
    };
    useEffect(updateTitle, [title]);
    return setTitle;
  };
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

  const handleBookInfo = (book) => {
    setBookInfo(book);
  };

  const handleCurrentbook = (book) => {
    setCurrentBook(book);
  };

  return (
    <div className="App">
      <Router>
        <TitleBar
          username={username}
          handleLogout={handleLogout}
          isLogin={isLogin}
        />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <MainPage
                handleLogin={handleLogin}
                handleUsername={handleUsername}
                useTitle={useTitle()}
              />
            }
          ></Route>
          <Route
            exact
            path="/signup"
            element={
              <SignUpPage
                handleUsername={handleUsername}
                useTitle={useTitle()}
              />
            }
          ></Route>
          <Route
            exact
            path="/mypage"
            element={<MainMyPage isLogin={isLogin} useTitle={useTitle()} />}
          ></Route>
          <Route
            exact
            path="/checkpassword"
            element={<ChkPassPage isLogin={isLogin} useTitle={useTitle()} />}
          ></Route>
          <Route
            exact
            path="/withdrawal"
            element={
              <WithdrawalPage
                handleUsername={handleUsername}
                isLogin={isLogin}
                useTitle={useTitle()}
              />
            }
          ></Route>

          <Route
            exact
            path="/modify"
            element={<MdfPassPage isLogin={isLogin} useTitle={useTitle()} />}
          ></Route>
          <Route
            exact
            path="/booklist"
            element={
              <BookListPage
                handleCurrentbook={handleCurrentbook}
                currentBook={currentBook}
                isLogin={isLogin}
                useTitle={useTitle()}
              />
            }
          ></Route>
          <Route
            exact
            path="/booklist/reviewlist"
            element={
              <ReviewListPage
                currentBook={currentBook}
                isLogin={isLogin}
                useTitle={useTitle()}
              />
            }
          ></Route>
          <Route
            exact
            path="/review/book"
            element={
              <SelectBookPage
                handleBookInfo={handleBookInfo}
                isLogin={isLogin}
                useTitle={useTitle()}
              />
            }
          ></Route>
          <Route
            path="/reviewinput"
            element={
              <ReviewInputPage
                bookInfo={bookInfo}
                isLogin={isLogin}
                useTitle={useTitle()}
              />
            }
          ></Route>
          <Route
            exact
            path="/login/google"
            element={
              <GoogleLoginPage
                handleLogin={handleLogin}
                handleUsername={handleUsername}
                useTitle={useTitle()}
              />
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export { App as default, MainPage };
