var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Gestion des unités d'enseignement" });
});

module.exports = router;
