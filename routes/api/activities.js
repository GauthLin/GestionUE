var express = require('express');
var router = express.Router();

var activity_manager = require('../../manager/ActivityManager');

router.get('/', function(req, res) {
    activity_manager.find(undefined, function(err, data) {
        res.json({status: 'success', data: data});
    });
});

router.get('/:id', function(req, res) {
    activity_manager.find(req.params.id, function(err, data) {
        res.json({status: 'success', data: data});
    });
});

router.post('/', function(req, res) {
    var name = req.body.name,
        code = req.body.code,
        type = req.body.type,
        hours = req.body.hours,
        ue_id = req.body.ue,
        local = req.body.local;

    // vérification du nombre d'heures
    if (!((type === 'course' && hours % 1.5 === 0) || (type === 'laboratory' && hours % 3.5 === 0))) {
        res.json({status: 'error', data: "Le nombre d'heures doit être égale à n x 1.5 pour un cours et à n x 3.5 pour un laboratoire."});
        return;
    }

    activity_manager.insert(code, hours, local, name, type, ue_id, function() {
        res.json({status: 'success', data: null});
    });
});

router.put('/:id', function(req, res) {
    var name = req.body.name,
        code = req.body.code,
        type = req.body.type,
        hours = req.body.hours,
        ue_id = req.body.ue,
        local = req.body.local;

    activity_manager.update(req.params.id, code, hours, local, name, type, ue_id, function() {
        res.json({status: 'success', data: null});
    })
});

router.delete('/:id', function(req, res) {
    activity_manager.delete(req.params.id, function() {
        res.json({status: 'success', data: null});
    });
});

module.exports = router;