const { book } = require('../models');
const { isAuthorized } = require('./tokenFunctions');

module.exports = {
  list: (req, res) => {
    const data = isAuthorized(req);
    if (!data) {
      res.status(401).json({ message: 'Invalid user' });
    } else {
      book.list(data.id, (error, bookList) => {
        if (error) {
          res.status(500).json({ message: 'Server Error' });
        } else {
          res.json({ message: 'OK', data: { book_list: bookList } });
        }
      });
    }
  },
  reviews: (req, res) => {},
};
