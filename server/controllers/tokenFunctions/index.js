require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');
const cryptoJS = require('crypto-js')

module.exports = {
  generateHash: (data) => {
    return cryptoJS.SHA256(data, process.env.SALT).toString()
  },
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '1d' });
  },
  sendAccessToken: (res, data, accessToken) => {
    res.cookie('accessToken', accessToken, {
      // domain: 'localhost', 
      path: '/',
      maxAge: 24 * 60 * 60 * 1000,
      // sameSite: 'none',
      // secure: true,
      httpOnly: true,
    })
    res.json({ data, message: 'ok' });
  },
  isAuthorized: (req) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return null;
    }
    try {
      return verify(accessToken, process.env.ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
};
