var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('gestion_ue.db');

const UE = {};

UE.find = function (id, callback) {
    var data = {};

    db.serialize(function () {
        var query = "SELECT * FROM ue";
        query += id !== undefined && id !== null ? ' WHERE id = ' + parseInt(id) : '';
        db.each(query, function (err, row) {
            data[row.id] = {id: row.id, code: row.code, name: row.code, activities: [], prerequisites: []};
        });

        var sql_act = "SELECT * FROM activities";
        sql_act += id !== undefined && id !== null ? ' WHERE ue_id = ' + parseInt(id) : '';
        db.each(sql_act, function (err, row) {
            data[row.ue_id].activities.push({
                id: row.id,
                name: row.name,
                code: row.code,
                type: row.type,
                hours: row.hours,
                local: row.type
            })
        });

        var sql_pre = "SELECT * FROM prerequisites";
        sql_pre += id !== undefined && id !== null ? ' WHERE ue_id = ' + parseInt(id) : '';
        db.each(sql_pre, function (err, row) {
            data[row.ue_id].prerequisites.push(row.ue_prerequisite_id);
        }, function (err) {
            // Removes the keys
            var res = [];
            for (var key in data) {
                res.push(data[key]);
            }
            // Send the array with all the value
            callback(err, res);
        })
    });
};

UE.add = function (code, name, pres, callback) {
    // insert into database
    db.serialize(function () {
        db.run('INSERT INTO ue (code, name) VALUES (?, ?)', [code, name], function () {
            var ue_id = parseInt(this.lastID);
            var sql = 'INSERT INTO prerequisites';
            pres.forEach(function (pre, index) {
                pre = parseInt(pre);
                if (index === 0)
                    sql += ' SELECT ' + pre + ' AS ue_prerequisite_id, ' + ue_id + ' AS ue_id';
                else
                    sql += ' UNION ALL SELECT ' + pre + ', ' + ue_id
            });
            db.run(sql, function() {
                callback();
            });
        });
    });
};

module.exports = Object.freeze(UE);