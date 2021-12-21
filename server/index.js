const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const https = require('https');
const router = require('./routes');
require('dotenv').config();

const scheduler = require('./controllers/mail/cron');

const PORT = process.env.PORT || 80;
scheduler();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PATCH'],
  })
);
app.use(cookieParser());

app.use('/', router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
