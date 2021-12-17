const { review } = require('../models');

module.exports = {
  new: (req, res) => {
    const {
      title,
      contents,
      isbn,
      thumbnail,
      author,
      published_at,
      publisher,
      url,
      review: review_contents,
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
      review_contents,
      page,
    };
    review.new(bookData, reviewData, (error, result) => {
      if (error) throw error;
      res.json(result);
    });
  },
  edit: () => {},
  remove: () => {},
};
