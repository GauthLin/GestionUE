var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('gestion_ue.db');

const UE = {};

UE.find = function (callback, res, id) {
    var find_query = "SELECT ue.id as ue_id, ue.name as ue_name, ue.code as ue_code, a.* FROM ue LEFT JOIN activities a ON a.ue_id = ue.id";
    if (id === undefined) {
        db.serialize(function () {
            db.all(find_query, function (err, rows) {
                // If err stop the query
                if (err !== null) {
                    callback({status: 'error', data: err.code}, res);
                    return;
                }

                // browses each row
                var data = serializeUE(rows);

                callback({status: 'success', data: data}, res);
            });
        });
    }
    else {
        id = parseInt(id);

        db.serialize(function () {
            db.all(find_query + ' WHERE ue.id = ?', id, function (err, rows) {
                // If err stop the query
                if (err !== null) {
                    callback({status: 'error', data: err.code}, res);
                    return;
                }

                if (rows.length === 0) {
                    callback({status: 'error', data: "L'unité d'enseignement est introuvable."}, res);
                    return;
                }

                // browses each row
                var data = serializeUE(rows);

                callback({status: 'success', data: data}, res);
            });
        });
    }
};

function serializeUE(rows) {
    var data = [], last_ue = null, activities = [];

    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        // If new ue --> save the old one if exists and push related activities
        if (last_ue !== null && last_ue.id !== row.ue_id) {
            last_ue.activities = activities;
            data.push(last_ue);
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
        if (i === rows.length - 1) {
            last_ue.activities = activities;
            data.push(last_ue);
        }
    }

    return data;
}

module.exports = Object.freeze(UE);