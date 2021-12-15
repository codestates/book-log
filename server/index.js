const express = require('express');
const app = express();
const https = require('https');
const router = require('./routes');
require('dotenv').config();

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('HELLO WORLD');
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
