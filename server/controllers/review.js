const { review } = require('../models');
const { isAuthorized } = require('./tokenFunctions');

module.exports = {
  new: (req, res) => {
    const data = isAuthorized(req);
    if (!data) {
      res.status(401).json({ message: 'Invalid User' });
    }
    const {
      title,
      contents,
      isbn,
      thumbnail,
      author,
      published_at,
      publisher,
      url,
      reviewContents,
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
      if (error) {
        res.status(500).json({ message: 'Server Error' });
      }
      res.json({ message: 'ok', data: { ...result } });
    });
  },
  edit: (req, res) => {
    const data = isAuthorized(req);
    if (!data) {
      res.json({ message: 'Invalid user' });
    } else {
      const { review_id, review: reviewContent } = req.body;
      review.edit(review_id, reviewContent, (error, result) => {
        if (error || result.changeRows === 0) {
          res.status(500).json({ message: 'Server Error' });
        }
        res.json({ message: 'ok', data: { review_id } });
      });
    }
  },
  remove: (req, res) => {
    const data = isAuthorized(req);
    if (!data) {
      res.status(500).json({ message: 'Server Error' });
    } else {
      const { review_id } = req.params;
      review.remove(review_id, (error, result) => {
        if (error) {
          res.status(500).json({ message: 'Server Error' });
        }
        res.json({ message: 'ok' });
      });
    }
  },
};
