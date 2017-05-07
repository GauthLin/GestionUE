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

router.get('/ue/:id', function (req, res) {
    ue_manager.find(req.params.id, function(err, data) {
        res.render('ue', {title: "Gestion des unités d'enseignement", ue: data});
    });
});

router.use('/activities', function (req, res) {
    ue_manager.find(null, function(err, data) {
        res.render('activities', {title: "Activités", ues: data});
    });
});


module.exports = router;
