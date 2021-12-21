const nodemailer = require('nodemailer');
require('dotenv').config();

const mailSender = {
  sendGmail: async (to, username, reviewData) => {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    const subject = `[📖BookLog] ${username}님의 지난 달 감상들📝`;
    let html = ``;

    reviewData.map((review) => {
      html += `<h2>${review.title}</h2><img src="${review.thumbnail}" />`;
      review.review_data.map((data) => {
        data.reviews.map(({ contents, created_at }) => {
          html += `
          <div><b style="font-size: 1.3rem">${
            created_at.toISOString().slice(0, 10) + ' / ' + 'p.' + data.page
          }</b><div>
          <p>${contents}</p>`;
        });
      });
    });

    console.log(html);

    let info = await transporter.sendMail(
      {
        from: process.env.NODEMAILER_USER,
        to,
        subject,
        html,
      },
      (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }
    );
  },
};

module.exports = mailSender;
