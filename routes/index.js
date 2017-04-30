var express = require('express');
var router = express.Router();

var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('gestion_ue.db');

router.get('/', function (req, res) {
    res.render('index', {title: "Page d'accueil"});
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
