var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('gestion_ue.db');

// Creates new ue
router.post('/', function (req, res) {
    var code = req.body.code, name = req.body.name;
    // check values
    if (code.length === 0 || name.length === 0) {
        res.json({
            'status': 'fail', 'data': {
                'message': "Le nom et le code de l'unité d'enseignement ne peuvent pas être vide!"
            }
        });
    }
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
    var response = [], last_ue = null, activities = [];

    db.serialize(function () {
        db.all('SELECT ue.id as ue_id, ue.name as ue_name, ue.code as ue_code, a.* FROM ue LEFT JOIN activities a ON a.ue_id = ue.id', function (err, rows) {
            // browses each row
            for(var i = 0; i < rows.length; i++) {
                var row = rows[i];
                console.log(last_ue, row);
                // If new ue --> save the old one if exists and push related activities
                if (last_ue !== null && last_ue.id !== row.ue_id) {
                    last_ue.activities = activities;
                    response.push(last_ue);
                    activities = [];
                    last_ue = null;
                }

                // if new ue --> creates it
                if (last_ue === null) {
                    last_ue = {id: row.ue_id, name: row.ue_name, code: row.ue_code, activities: []};
                }

                // if there are activities for that ue --> push it
                if (row.ue_id !== null)
                    activities.push({
                        id: row.id,
                        code: row.code,
                        hours: row.hours,
                        local: row.local,
                        name: row.name,
                        type: row.type
                    });

                // if last row --> save
                if (i === rows.length - 1){
                    last_ue.activities = activities;
                    response.push(last_ue);
                }
            }

            res.json(response);
        });
    });
});

module.exports = router;
