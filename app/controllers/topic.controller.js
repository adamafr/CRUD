const Topic = require("../models/topic.model.js");

// Create and Save a new Topic
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Object can not be empty!"
        });
    }

    // Create a Topic
    const topic = new Topic({
        title: req.body.title
    });

    // Save Topic in the database
    Topic.create(topic, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error while creating the topic."
            });
        else res.send(data);
    });
};

// Retrieve all topics from the database.
exports.findAll = (req, res) => {
    Topic.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving topic."
            });
        else res.send(data);
    });
};

// Find a single topic with a TopicId
exports.findOne = (req, res) => {
    Topic.findById(req.params.topicId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found topic with id ${req.params.topicId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving topic with id " + req.params.topicId
                });
            }
        } else res.send(data);
    });
};

// Update a topic identified by the TopicId in the request
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Object can not be empty!"
        });
    }

    Topic.updateById(
        req.params.topicId,
        new Topic(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found topic with id ${req.params.topicId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating topic with id " + req.params.topicId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a topic with the specified topicId in the request
exports.delete = (req, res) => {
    Topic.remove(req.params.topicId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found topic with id ${req.params.topicId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete topic with id " + req.params.topicId
                });
            }
        } else res.send({ message: `Topic was deleted successfully!` });
    });
};

// Delete all topics from the database.
exports.deleteAll = (req, res) => {
    Topic.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all topics."
            });
        else res.send({ message: `All topics were deleted successfully!` });
    });
};