const { user } = require('../models');
const {
  generateHash,
  generateAccessToken,
  sendAccessToken,
  isAuthorized,
} = require('./tokenFunctions');
require('dotenv').config();

module.exports = {
  login: {
    general: (req, res) => {
      let { email, password } = req.body
      password = generateHash(password)
      user.login.general(email, password, (error, result) => {
        if (error) {
          res.status(500).json({ message: 'Server Error' });
        } else {        
          if (result.length !== 0) {
              const data = { ...result[0] }
              const accessToken = generateAccessToken(data);
              data['user_id'] = data['id']
              delete data['id']
              sendAccessToken(res, data, accessToken);
          }
          else {
              res.status(401).json({ message: 'Invalid user or Wrong password' })
          }
        }
      });
    },
    social: (req, res) => {
      let { email, social } = req.body
      user.login.social(email, social, (error, result) => {
        if (error) {
          res.status(500).json({ message: 'Server Error' });
        } else {        
          if (result.length !== 0) {
              const data = { ...result[0] }
              const accessToken = generateAccessToken(data);
              data['user_id'] = data['id']
              delete data['id']
              sendAccessToken(res, data, accessToken);
          }
          else {
              res.status(401).json({ message: 'Invalid user' })
          }
        }
      });
    },
  },
  logout: (req, res) => {
    res.clearCookie('accessToken')
    res.status(200).json({ message: 'ok' })
  },
  signup: {
    general: (req, res) => {
      let { email, username, password } = req.body
      password = generateHash(password)
      user.signup.general(email, username, password, (error, result) => {
        if (error) {
          res.status(500).json({ message: 'Server Error' });
        } else {
          if (result === 'Conflict') {
            res.status(409).json({ message: 'Conflict' });
          } else {
            const userInfo = {
              id: result.insertId,
              username,
              email,
              created_at: new Date()
            }
            res.status(201).json({
              data: { userInfo },
              message: "Created",
            })
          }
        }
      })
    },
    social: (req, res) => {
      let { email, username, social } = req.body
      user.signup.social(email, username, social, (error, result) => {
        if (error) {
          res.status(500).json({ message: 'Server Error' });
        } else {
          if (result === 'Conflict') {
            res.status(409).json({ message: 'Conflict' });
          } else {
            const userInfo = {
              id: result.insertId,
              username,
              email,
              created_at: new Date()
            }
            res.status(200).json({
              data: { userInfo },
              message: "Created",
            })
          }
        }
      })
    },
  },
  withdrawal: (req, res) => {
    const data = isAuthorized(req)
    if (data === null) {
      return res.status(401).json({ message: 'Invalid user'})
    }    
    let { password } = req.body
    password = generateHash(password)
    const { email } = data
    user.withdrawal(email, password, (error, result) => {
      if (error) {
        res.status(500).json({ message: 'Server Error' });
      } else {
        if (result === 'Wrong password') {
          res.status(401).json({ message: 'Wrong password' });
        } else {
          res.clearCookie('accessToken')
          res.status(200).json({ message: 'ok' });
        }
      }
    })
  },
  password: {    
    check: (req, res) => {
      const data = isAuthorized(req)
      if (data === null) {
        return res.status(401).json({ message: 'Invalid user'})
      }
      let { password } = req.body
      password = generateHash(password)
      const { email } = data
      user.password.check(email, password, (error, result) => {
        if (error) {
          res.status(500).json({ message: 'Server Error' });
        } else {          
          if (result === 'Wrong password') {
            res.status(401).json({ message: 'Wrong password' });
          } else {
            res.status(200).json({ message: 'ok' });
          }
        }  
      })
    },
    new: (req, res) => {
      const data = isAuthorized(req)
      if (data === null) {
        return res.status(401).json({ message: 'Invalid user'})
      }
      let { password } = req.body
      password = generateHash(password)
      const { email } = data
      user.password.new(email, password, (error, result) => {
        if (error) {
          res.status(500).json({ message: 'Server Error' });
        } else {
          if (result === 'Same Password') {
            res.status(409).json({ message: 'Same Password' });
          } else {
            res.status(200).json({ message: 'ok' });
          }
        }
      })
    },
  },
  email: {
    check: (req, res) => {
      const data = isAuthorized(req)
      if (data === null) {
        return res.status(401).json({ message: 'Invalid user'})
      }
      const email = req.body.email
      user.email.check(email, (error, result) => {
        if (error) {
          res.status(500).json({ message: 'Server Error' });
        } else {
          if (result === 'Duplicated Email') {
            res.status(409).json({ message: 'Duplicated Email' });
          } else {
            res.status(200).json({ message: 'ok' });
          }
        }
      })      
    },
  },
  social: {
    check: (req, res) => {
      const data = isAuthorized(req)
      if (data === null) {
        return res.status(401).json({ message: 'Invalid user'})
      }
      const email = data.email
      user.social.check(email, (error, result) => {
        if (error) {
          res.status(500).json({ message: 'Server Error' });
        } else {
          if (result === 'Social') {
            res.status(403).json({ message: 'Social' });
          } else {
            res.status(200).json({ message: 'General' });
          }
        }
      })  
    }
  },
};
