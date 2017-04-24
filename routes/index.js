var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('gestion_ue.db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Gestion des unités d'enseignement" });
});

router.use('/activities', function(req, res, next) {
  db.serialize(function() {
  	db.all('SELECT id, code, name FROM ue', function(err, rows) {
  	  console.log(rows);
  	  res.render('activities', { title: "Activités", ues: rows });
  	});
    
  });
});


module.exports = router;
