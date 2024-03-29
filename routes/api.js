var express = require('express');
var router = express.Router();

var ue = require('./api/ue');
var activities = require('./api/activities');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('gestion_ue.db');

router.use('/ue', ue);

router.use('/activities', activities);

module.exports = router;