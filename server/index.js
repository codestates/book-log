const express = require('express');
const app = express();
const cors = require('cors')
const https = require('https');
const router = require('./routes');
require('dotenv').config();

const PORT = process.env.PORT || 80;

app.use(
  cors({
    origin: "http://book-log-client.s3-website.ap-northeast-2.amazonaws.com/",
    methods: ['GET', 'POST', 'OPTIONS', 'PATCH'],
    credentials: true
  })
);

app.get('/', (req, res) => {
  res.send('HELLO WORLD');
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
