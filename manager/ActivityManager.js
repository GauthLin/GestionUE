var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('gestion_ue.db');

const Activity = {};

Activity.find = function(id, callback) {
    var data = [],
        query = id === undefined ? '' : ' WHERE id = '+ id;
    db.serialize(function() {
        db.each('SELECT * FROM activities'+ query, function(err, row) {
            data.push({id: row.id, name: row.name, code: row.code, type: row.type, hours: row.hours, local: row.local, ue_id: row.ue_id});
        }, function(err) {
            callback(err, data);
        })
    });
};

Activity.insert = function(code, hours, local, name, type, ue_id, callback) {
    db.serialize(function() {
        var stmt = db.prepare('INSERT INTO activities (code, hours, local, name, type, ue_id) VALUES (?, ?, ?, ?, ?, ?)');
        stmt.run(code, hours, local, name, type, ue_id);
        stmt.finalize();

        callback();
    });
};

Activity.update = function(id, code, hours, local, name, type, ue_id, callback) {
    db.serialize(function() {
        db.run('UPDATE activities SET name = ?, code = ?, type = ?, hours = ?, local = ?, ue_id = ? WHERE id = ?', [name, code, type, hours, local, ue_id, id], function() {
            callback();
        });
    });
};

Activity.delete = function(id, callback) {
    db.serialize(function() {
        db.run("DELETE FROM activities WHERE id = ?", id, function() {
            callback();
        })
    });
};

Activity.find = function(id, callback) {
    var data = [];

    var sql_act = "SELECT * FROM activities";
    sql_act += id !== undefined && id !== null ? ' WHERE id = ' + parseInt(id) : '';
    db.each(sql_act, function(err, row) {
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