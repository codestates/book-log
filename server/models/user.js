const db = require('../db');

module.exports = {
  login: (email, password, callback) => {
    const queryString = `
            SELECT id, username, email FROM user
            WHERE email = "${email}" AND password = "${password}"
        `;
    db.query(queryString, (error, result) => {
      if (error) throw error;
      callback(error, result);
    });
  },
  signup: (email, username, password, callback) => {
    let queryString = `
      SELECT email FROM user
      WHERE email = "${email}"
    `;
    db.query(queryString, (error, result) => {
      if (error) throw error;
      if (result.length !== 0) {
        callback(null, "Conflict")
      } else {
        queryString = `
          INSERT INTO user
          (email, username, password)
          VALUES
          ("${email}", "${username}", "${password}")
        `
        db.query(queryString, (error, result) => {
          if (error) throw error;
          callback(error, result)
        })
      }
    })
  },
  withdrawal: (email, password, callback) => {
    let queryString = `
    SELECT password FROM user
    WHERE email = "${email}"
  `;
  db.query(queryString, (error, result) => {
    if (error) throw error;
    if (result[0].password !== password) {
      callback(error, 'Wrong password')
    } else {
      queryString = `
        DELETE FROM user
        WHERE email = "${email}"
      `
      db.query(queryString, (error, result) => {
        if (error) throw error;
        callback(error, 'ok')
      })
    }
  })
  },
  password: {
    check: (email, password, callback) => {
      const queryString = `
        SELECT password FROM user
        WHERE email = "${email}"
      `;
      db.query(queryString, (error, result) => {
        if (error) throw error;
        if (result[0].password !== password) {
          callback(error, 'Wrong password')
        } else {
          callback(error, 'ok')
        }        
      })
    },
    new: (email, password, callback) => {
      let queryString = `
        SELECT password FROM user
        WHERE email = "${email}"
      `;
      db.query(queryString, (error, result) => {
        if (error) throw error;
        if (result[0].password === password) {
          callback(error, 'Same Password')
        } else {
          queryString = `
            UPDATE user
            SET password = "${password}"
            WHERE email = "${email}"
          `
          db.query(queryString, (error, result) => {
            if (error) throw error;
            callback(error, 'ok')
          })
        }
      })
    },
  },
  email: {
    check: (email, callback) => {
      const queryString = `
        SELECT email FROM user
        WHERE email = "${email}"
      `
      db.query(queryString, (error, result) => {
        if (error) throw error;
        if (result.length === 0) {
          callback(error, 'ok')
        } else {
          callback(error, 'Duplicated Email')
        }
      })
    },
  },
};
