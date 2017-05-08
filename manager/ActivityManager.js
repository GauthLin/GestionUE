var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('gestion_ue.db');

const Activity = {};

Activity.insert = function(code, hours, local, name, type, ue_id, callback) {
    db.serialize(function() {
        var stmt = db.prepare('INSERT INTO activities (code, hours, local, name, type, ue_id) VALUES (?, ?, ?, ?, ?, ?)');
        stmt.run(code, hours, local, name, type, ue_id);
        stmt.finalize();

        callback();
    });
};

Activity.find = function(id, callback) {
    var data = [];

    var sql_act = "SELECT * FROM activities";
    sql_act += id !== undefined && id !== null ? ' WHERE id = ' + parseInt(id) : '';
    db.each(sql_act, function (err, row) {
        data.push({
            id: row.id,
            name: row.name,
            code: row.code,
            type: row.type,
            hours: row.hours,
            local: row.local,
            ue_id: row.ue_id
        });
    }, function(err) {
        callback(err, data);
    });
};


module.exports = Object.freeze(Activity);