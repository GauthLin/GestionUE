var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('gestion_ue.db');

var ue_manager = require('../../manager/UEManager');

// Creates new ue
router.post('/', function (req, res) {
    var code = req.body.code, name = req.body.name;
    // check values
    if (code.length === 0 || name.length === 0) {
        res.json({status: 'error', data: "Le nom et le code de l'unité d'enseignement ne peuvent pas être vide !"});
        return;
    }

    ue_manager.add(code, name, function () {
        res.json({'status': 'success', 'data': null});
    });
});

// Gets all the ues
router.get('/', function (req, res) {
    ue_manager.find(null, function (err, data) {
        if (err) {
            res.json({status: 'error', data: err});
            return;
        }
        res.json({status: 'success', data: data});
    });
});

// Gets one ue based on its id
router.get('/:id', function (req, res) {
    var id = req.params.id;
    if (isNaN(id)) {
        res.json({status: 'error', data: "L'identifiant doit être un nombre entier."});
        return;
    }
    id = parseInt(id);

    ue_manager.find(id, function (err, data) {
        if (err) {
            res.json({status: 'error', data: err});
            return;
        }
        res.json({status: 'success', data: data});
    });
});

module.exports = router;
