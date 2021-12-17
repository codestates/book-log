const { review } = require('../models');
const { isAuthorized } = require('./tokenFunctions');

module.exports = {
  new: () => {},
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
  remove: () => {},
};
