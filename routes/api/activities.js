var express = require('express');
var router = express.Router();

var activity_manager = require('../../manager/ActivityManager');

router.post('/', function(req, res) {
    var name = req.body.name,
        code = req.body.code,
        type = req.body.type,
        hours = req.body.hours,
        ue_id = req.body.ue,
        local = req.body.local;

    activity_manager.insert(code, hours, local, name, type, ue_id, function() {
        res.json({'status': 'success', 'data': null});
    });
});

module.exports = router;