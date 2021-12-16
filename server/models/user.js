const db = require('../db');

module.exports = {
    login: (email, password, callback) => {
        const queryString = `
            SELECT id, username, email FROM user
            WHERE email = "${email}" AND password = "${password}"
        `
        db.query(queryString, (error, result) => {
            if (error) throw error
            callback(error, result)
        })
    },
    logout: () => {

    },
    signup: () => {

    },
    withdrawal: () => {

    },
    password: {
        check: () => {

        },
        new: () => {

        }
    },
    email: {
        check: () => {

        }
    }
};
