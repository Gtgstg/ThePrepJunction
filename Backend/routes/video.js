const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

router.post('/upload', upload.single('video'), (req, res) => {
  res.status(200).json({ message: 'Video uploaded successfully' });
});

module.exports = router;