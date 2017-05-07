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


module.exports = Object.freeze(Activity);