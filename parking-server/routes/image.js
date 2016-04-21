var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.post('/mark', function(req, res, next) {
  res.json({a: 1});
  //TODO
});

router.get('/parking', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/images/parking.jpg'));
});

module.exports = router;