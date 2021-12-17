const db = require('../db');

module.exports = {
  list: (userId, callback) => {
    const queryString = `
      SELECT b.id book_id, b.title, b.thumbnail, b.contents, b.isbn, b.published_at, b.publisher, b.url
      FROM user_book ub
      JOIN book b ON b.id = ub.book_id
      WHERE ub.user_id = ?`;
    db.query(queryString, [userId], (err, bookList) => {
      if (err) throw err;
      callback(err, bookList);
    });
  },
  reviews: () => {},
};
