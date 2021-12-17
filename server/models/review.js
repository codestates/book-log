const db = require('../db');

module.exports = {
  new: (bookData, reviewData, callback) => {
    const {
      title,
      contents,
      isbn,
      thumbnail,
      author,
      published_at,
      publisher,
      url,
    } = bookData;
    const bookQuery = `
      SELECT id FROM book WHERE title = ? AND author = ? AND publisher = ?
      `;
    db.query(bookQuery, [title, author, publisher], (error, result) => {
      if (error) throw error;
      let book_id;
      if (result.length === 0) {
        const bookInsert = `
          INSERT INTO book (title, contents, isbn, thumbnail, author, published_at, publisher, url, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, curdate())
        `;
        db.query(
          bookInsert,
          [
            title,
            contents,
            isbn,
            thumbnail,
            author,
            published_at,
            publisher,
            url,
          ],
          (error, result) => {
            if (error) throw error;
            book_id = result.insertId;
          }
        );
      } else {
        book_id = result[0].id;
      }
    });
  },
  edit: () => {},
  remove: () => {},
};
