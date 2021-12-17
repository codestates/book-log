require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '1d' });
  },
  sendAccessToken: (res, accessToken) => {
    res.cookie('accessToken', accessToken, {
      // domain: 'localhost', 
      path: '/',
      maxAge: 24 * 60 * 60 * 1000,
      // sameSite: 'none',
      // secure: true,
      httpOnly: true,
    })
    res.json({ message: 'ok' });
  },
  resendAccessToken: (res, accessToken, data) => {
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
    })
    res.json({ message: 'ok' });
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
