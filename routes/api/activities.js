var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('gestion_ue.db');

router.use('/', function() {
	//res.render('activities', { title: "Activités" });
});

module.exports = router;