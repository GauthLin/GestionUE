var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('gestion_ue.db');

router.post('/', function(req, res) {
    var name = req.body.name,
        code = req.body.code,
        type = req.body.type,
        hours = req.body.hours,
        ue_id = req.body.ue,
        local = req.body.local;

    db.serialize(function() {
        var stmt = db.prepare('INSERT INTO activities (code, hours, local, name, type, ue_id) VALUES (?, ?, ?, ?, ?, ?)');
        stmt.run(code, hours, local, name, type, ue_id);
        stmt.finalize();
    });

    res.json({'status': 'success', 'data': null});
});

module.exports = router;