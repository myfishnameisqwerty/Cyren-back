var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: `Cyren user control task. \n
  Created by Yevgeny Volodarsky` });
});

module.exports = router;
