var express = require('express');
var router = express.Router();

var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('gestion_ue.db');

var ue_manager = require('../manager/UEManager');

router.get('/', function (req, res) {
    ue_manager.find(null, function(err, data) {
        res.render('index', {title: "Page d'accueil", ues: data});
    });
});

router.get('/ue', function (req, res) {
    res.render('ue', {title: "Gestion des unités d'enseignement"});
});

router.use('/activities', function (req, res) {
    db.serialize(function () {
        db.all('SELECT id, code, name FROM ue', function (err, rows) {
            res.render('activities', {title: "Activités", ues: rows});
        });

    });
});


module.exports = router;
