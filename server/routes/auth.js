const router = require('express').Router();
const { auth } = require('../controllers');

router.get('/google', auth.google.getUrl)
router.get('/google/callback', auth.google.callback)

module.exports = router;