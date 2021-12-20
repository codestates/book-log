const { query } = require('../db');
const db = require('../db');

module.exports = {
  new: (userId, bookData, reviewData, callback) => {
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
    const { reviewContents, page } = reviewData;
    const isExist = `
    SELECT id FROM book WHERE title = ? AND author = ? AND publisher = ?
    `;
    const reviewInsert = `
      INSERT INTO review (user_id, book_id, contents, created_at, modified_at, page)
      VALUES (?, ?, ?, curdate(), curdate(), ?)
    `;
    const bookInsert = `
      INSERT INTO book (title, contents, isbn, thumbnail, author, published_at, publisher, url, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, curdate())
    `;
    db.query(isExist, [title, author, publisher], (error, result) => {
      if (error) throw error;
      let bookId;
      if (result.length === 0) {
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
            bookId = result.insertId;
            const userBookQuery = `
              INSERT INTO user_book (user_id, book_id)
              VALUES (?, ?)
            `;
            db.query(userBookQuery, [userId, bookId], (error, result) => {
              if (error) throw error;
              db.query(
                reviewInsert,
                [userId, bookId, reviewContents, page],
                (error, result) => {
                  if (error) throw error;
                  callback(error, {
                    review_id: result.insertId,
                    book_id: bookId,
                  });
                }
              );
            });
            console.log(result);
          }
        );
      } else {
        bookId = result[0].id;
        db.query(
          reviewInsert,
          [userId, bookId, reviewContents, page],
          (error, result) => {
            if (error) throw error;
            callback(error, { review_id: result.insertId, book_id: bookId });
          }
        );
      }
    });
  },
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
