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
  reviews: (userId, bookId, callback) => {
    const queryString = `
      SELECT b.title, b.thumbnail, b.contents, b.id, r.id review_id, r.page, r.created_at, r.contents review
      FROM review r
      JOIN book b ON b.id = r.book_id
      WHERE r.user_id = ? AND r.book_id = ?
    `;
    db.query(queryString, [userId, bookId], (err, reviewList) => {
      if (err) throw err;
      callback(err, reviewList);
    });
  },
  bookData: (book_id, callback) => {
    const query = `SELECT title, thumbnail, contents FROM book WHERE id = ?`;
    db.query(query, [book_id], (err, result) => {
      if (err) throw err;
      callback(err, result);
    });
  },
};
