const cron = require('node-cron');
const mailSender = require('./mailSender');
const { review } = require('../../models');

const scheduler = () => {
  cron.schedule('0 8 1 * *', function () {
    review.mail((err, result) => {
      if (err) throw err;
      const { email, username } = result.user_data;
      const reviewData = result.data;
      mailSender.sendGmail(email, username, reviewData);
    });
    //0 8 1 * *
    console.log('running a task every month');
  });
};

module.exports = scheduler;
