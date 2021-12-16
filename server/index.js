const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const https = require('https');
const router = require('./routes');
require('dotenv').config();

const PORT = process.env.PORT || 80;

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(
  cors({
    origin: ['http://book-log-client.s3-website.ap-northeast-2.amazonaws.com/'],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PATCH']
  })
);
app.use(cookieParser())

app.use('/', router)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
