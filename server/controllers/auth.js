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
  `${process.env.DOMAIN}:${PORT}/auth/google/callback`
);

const authURL = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope,
});

const makeResponse = async (res, data) => {
  const login = await axios.post(
    `${process.env.DOMAIN}:${PORT}/user/login/social`,
    data
  );
  const accessToken = login.headers['set-cookie'][0]
    .split(';')[0]
    .split('=')[1];
  res.cookie('accessToken', accessToken, {
    domain: 'localhost',
    path: '/',
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'none',
    // secure: true,
    httpOnly: true,
  });
  const resdata = new URLSearchParams({
    username: login.data.data.username,
  });
  const queryString = resdata.toString();
  res.redirect(`${process.env.DOMAIN}:3000/login/google?${queryString}`);
};

module.exports = {
  google: {
    getUrl: (req, res) => {
      return res.send(authURL);
    },
    callback: async (req, res) => {
      const authorizationCode = req.query.code;
      const { tokens } = await oauth2Client.getToken(authorizationCode);
      oauth2Client.setCredentials(tokens);
      const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
      const info = await oauth2.userinfo.get();
      const data = {
        email: info.data.email,
        username: info.data.family_name,
        social: 'google',
      };
      axios
        .post(`${process.env.DOMAIN}:${PORT}/user/signup/social`, data)
        .then((response) => {
          console.log('회원가입 성공');
          makeResponse(res, data);
        })
        .catch((err) => {
          console.log('기존회원 로그인');
          makeResponse(res, data);
        });
    },
  },
};
