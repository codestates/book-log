const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const https = require('https');
const router = require('./routes');
const axios = require('axios');
const { google } = require('googleapis');
require('dotenv').config();

const PORT = process.env.PORT || 80;

const scope = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
];

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.SERVER_ROOT_URI}/auth/google/callback`
);

const authURL = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PATCH'],
  })
);
app.use(cookieParser());

app.get('/auth/google', (req, res) => {
  return res.send(authURL);
});

app.get('/auth/google/callback', async (req, res) => {
  const authorizationCode = req.query.code;
  const { tokens } = await oauth2Client.getToken(authorizationCode);
  oauth2Client.setCredentials(tokens);
  const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
  const info = await oauth2.userinfo.get();
  data = {
    email: info.data.email,
    username: info.data.family_name,
    social: 'google',
  };
  axios
    .post('http://localhost:4000/user/signup/social', data)
    .then(async (response) => {
      console.log("회원가입 성공")
      const login = await axios.post('http://localhost:4000/user/login/social', data)
      const accessToken = login.headers['set-cookie'][0].split(';')[0].split('=')[1]
      console.log(accessToken)
      res.cookie('accessToken', accessToken, {
        // domain: 'localhost', 
        path: '/',
        maxAge: 24 * 60 * 60 * 1000,
        // sameSite: 'none',
        // secure: true,
        httpOnly: true,
      })
      res.redirect('http://localhost:3000/booklist');
    })
    .catch(async (err) => {
      const login = await axios.post('http://localhost:4000/user/login/social', data)
      const accessToken = login.headers['set-cookie'][0].split(';')[0].split('=')[1]
      console.log(accessToken)
      res.cookie('accessToken', accessToken, {
        // domain: 'localhost', 
        path: '/',
        maxAge: 24 * 60 * 60 * 1000,
        // sameSite: 'none',
        // secure: true,
        httpOnly: true,
      })
      res.redirect('http://localhost:3000/booklist');
    })
});

app.use('/', router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
