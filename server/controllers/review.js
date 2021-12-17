const { review } = require('../models');
const { isAuthorized } = require('./tokenFunctions');

module.exports = {
  new: (req, res) => {
    const data = isAuthorized(req);
    const {
      title,
      contents,
      isbn,
      thumbnail,
      author,
      published_at,
      publisher,
      url,
      review: reviewContents,
      page,
    } = req.body;
    const bookData = {
      title,
      contents,
      isbn,
      thumbnail,
      author,
      published_at,
      publisher,
      url,
    };
    const reviewData = {
      reviewContents,
      page,
    };
    review.new(data.id, bookData, reviewData, (error, result) => {
      if (error) throw error;
      res.json({ message: 'ok', data: { ...result } });
    });
  },
  edit: () => {},
  remove: () => {},
};
