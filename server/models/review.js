const db = require('../db');

module.exports = {
  new: () => {},
  edit: (review_id, review_content, callback) => {
    const updateQuery = `
      UPDATE review 
      SET contents = ?, modified_at = curdate()
      WHERE id = ?
    `;
    db.query(updateQuery, [review_content, review_id], (error, result) => {
      if (error) throw error;
      callback(error, result);
    });
  },
  remove: () => {},
};
