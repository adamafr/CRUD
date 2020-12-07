module.exports = app => {
    const topics = require("../controllers/topic.controller.js");


    app.post("/topics", topics.create);
    app.get("/topics", topics.findAll);
    app.get("/topics/:topicId", topics.findOne);
    app.put("/topics/:topicId", topics.update);
    app.delete("/topics/:topicId", topics.delete);
    app.delete("/topics", topics.deleteAll);
};