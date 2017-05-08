var express = require('express');
var router = express.Router();

var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('gestion_ue.db');

var ue_manager = require('../manager/UEManager'),
    activity_manager = require('../manager/ActivityManager');

router.get('/', function (req, res) {
    ue_manager.find(null, function(err, data) {
        res.render('index', {title: "Page d'accueil", ues: data});
    });
});

router.get('/ue', function (req, res) {
    ue_manager.find(null, function(err, data) {
        res.render('ue', {title: "Gestion des unités d'enseignement", ues: data});
    })
});

router.get('/ue/:id', function (req, res) {
    ue_manager.find(req.params.id, function(err, ue) {
        ue_manager.find(null, function(err, ues) {
            res.render('ue', {title: "Gestion des unités d'enseignement", ue: ue, ues: ues});
        })
    });
});

router.get('/activities', function (req, res) {
    ue_manager.find(null, function(err, data) {
        res.render('activities', {title: "Activités", ues: data});
    });
});

router.get('/activities/:id', function (req, res) {
    activity_manager.find(req.params.id, function(err, activities) {
        ue_manager.find(null, function(err, data) {
            res.render('activities', {title: "Activités", ues: data, activities: activities});
        });
    });
});


module.exports = router;
