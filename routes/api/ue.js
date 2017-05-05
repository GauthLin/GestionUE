var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('gestion_ue.db');

var ue_manager = require('../../manager/EUManager');

// Creates new ue
router.post('/', function (req, res) {
    var code = req.body.code, name = req.body.name;
    // check values
    if (code.length === 0 || name.length === 0)
        res.json({status: 'error', data: "Le nom et le code de l'unité d'enseignement ne peuvent pas être vide !"});

    // insert into database
    db.serialize(function () {
        var stmt = db.prepare('INSERT INTO ue (code, name) VALUES (?, ?)');
        stmt.run(code, name);
        stmt.finalize();
    });
    res.json({'status': 'success', 'data': null});
});

// Gets all the ues
router.get('/', function (req, res) {
    ue_manager.find(db_callback, res);
});

// Gets one ue based on its id
router.get('/:id', function(req, res) {
    var id = req.params.id;
    if (isNaN(id))
        res.json({status: 'error', data: "L'identifiant doit être un nombre entier."});
    id = parseInt(id);

    ue_manager.find(db_callback, res, id);
});

function db_callback(data, res){
    res.json(data);
}

module.exports = router;
