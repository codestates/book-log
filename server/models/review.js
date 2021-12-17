const db = require('../db');

module.exports = {
  new: () => {},
  edit: () => {},
  remove: (reviewId, callback) => {
    const queryString = `
      DELETE FROM review WHERE id = ?
    `;
    db.query(queryString, [reviewId], (error, result) => {
      if (error) throw error;

      callback(error, result);
    });
  },
};
