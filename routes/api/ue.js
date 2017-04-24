var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('gestion_ue.db');

router.post('/', function(req, res) {
	var code = req.body.code, name = req.body.name;
	// check values
	if (code.length == 0 || name.length == 0) {
		res.json({'status': 'fail', 'data': {
			'message': "Le nom et le code de l'unité d'enseignement ne peuvent pas être vide!"
		}});
	}
	// insert into database
	db.serialize(function() {
		var stmt = db.prepare('INSERT INTO ue (code, name) VALUES (?, ?)');
		stmt.run(code, name);
		stmt.finalize();
	});
	res.json({'status': 'success', 'data': null});
});

module.exports = router;
