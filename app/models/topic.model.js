const sql = require("./db.js");

const Topic = function (topic) {
    this.title = topic.title;
};

Topic.create = (newTopic, result) => {
    sql.query("INSERT INTO Topic SET ?", newTopic, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created topic: ", { id: res.insertId, ...newTopic });
        result(null, { id: res.insertId, ...newTopic });
    });
};

Topic.findById = (topicId, result) => {
    sql.query(`SELECT * FROM Topic WHERE id = ${topicId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found topic: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Topic.getAll = result => {
    sql.query("SELECT * FROM Topic", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("topics: ", res);
        result(null, res);
    });
};

Topic.updateById = (id, topic, result) => {
    sql.query(
        "UPDATE Topic SET title = ? WHERE id = ?",
        [topic.title, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated topic: ", { id: id, ...topic });
            result(null, { id: id, ...topic });
        }
    );
};

Topic.remove = (id, result) => {
    sql.query("DELETE FROM Topic WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted topic with id: ", id);
        result(null, res);
    });
};

Topic.removeAll = result => {
    sql.query("DELETE FROM Topic", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} topics`);
        result(null, res);
    });
};

module.exports = Topic;