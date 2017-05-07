var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('gestion_ue.db');

const UE = {};

UE.find = function (id, callback) {
    var data = [],
        query = "SELECT * FROM ue";
    query += id !== undefined && id !== null ? ' WHERE id = ' + parseInt(id) : '';

    db.serialize(function () {
        db.all(query, function (err, rows) {
            if (rows.length === 0) {
                callback(err, data);
            } else {
                rows.forEach(function (row, index) {
                    var ue = {id: row.id, name: row.name, code: row.code, activities: [], prerequisites: []};
                    db.all("SELECT * FROM activities WHERE ue_id = ?", row.id, function (err, rows1) {
                        rows1.forEach(function (row1) {
                            ue.activities.push({
                                id: row1.id,
                                code: row1.code,
                                name: row1.name,
                                hours: row1.hours,
                                local: row1.local,
                                type: row1.type
                            });
                        });
                        data.push(ue);
                        if (index === rows.length - 1)
                            callback(err, data);
                    });
                });
            }
        });
    });
};

UE.add = function (code, name, callback) {
    // insert into database
    db.serialize(function () {
        var stmt = db.prepare('INSERT INTO ue (code, name) VALUES (?, ?)');
        stmt.run(code, name);
        stmt.finalize();

        callback();
    });
};

module.exports = Object.freeze(UE);