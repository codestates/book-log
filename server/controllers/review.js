const { review } = require('../models');
const { isAuthorized } = require('./tokenFunctions');

module.exports = {
  new: () => {},
  edit: () => {},
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
