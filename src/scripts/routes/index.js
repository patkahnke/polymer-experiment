var express = require('express');
var router = express.Router();
var path = require('path');

// Handle my-app file separately
// Also catches any other request not explicitly matched elsewhere
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../../index.html'));
});

module.exports = router;
