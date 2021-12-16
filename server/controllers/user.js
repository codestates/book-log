const { user } = require('../models');
const {
  generateAccessToken,
  generateRefreshToken,
  sendRefreshToken,
  sendAccessToken,
  resendAccessToken,
  isAuthorized,
  checkRefeshToken,
} = require('./tokenFunctions');

module.exports = {
  login: (req, res) => {
    const email = req.body.email
    const password = req.body.password
    user.login(email, password, (error, result) => {
      if (error) {
        res.status(500).json({ message: 'Server Error' });
      } else {        
        if (result.length !== 0) {
            const data = { ...result[0] }
            const accessToken = generateAccessToken(data);
            const refreshToken = generateRefreshToken(data);
    
            sendRefreshToken(res, refreshToken);
            sendAccessToken(res, accessToken);
        }
        else {
            res.status(401).json({ message: 'Invalid user or Wrong password'})
        }
      }
    });
  },
  logout: () => {},
  signup: () => {},
  withdrawal: () => {},
  password: {
    check: () => {},
    new: () => {},
  },
  email: {
    check: () => {},
  },
};
