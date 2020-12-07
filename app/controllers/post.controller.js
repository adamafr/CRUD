const Post = require("../models/post.model.js");

// Create and Save a new Post
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Object can not be empty!"
        });
    }

    // Create a Post
    const post = new Post({
        content: req.body.content,
        author: req.body.author,
        date: req.body.date,
        id_topic: req.body.id_topic
    });

    // Save Post in the database
    Post.create(post, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error while creating the post."
            });
        else res.send(data);
    });
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
    Post.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving post."
            });
        else res.send(data);
    });
};

// Find a single Post with a PostId
exports.findOne = (req, res) => {
    Post.findById(req.params.postId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found post with id ${req.params.postId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving post with id " + req.params.postId
                });
            }
        } else res.send(data);
    });
};

// Update a Post identified by the PostId in the request
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Object can not be empty!"
        });
    }

    Post.updateById(
        req.params.postId,
        new Post(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Post with id ${req.params.postId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Post with id " + req.params.postId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Post with the specified PostId in the request
exports.delete = (req, res) => {
    Post.remove(req.params.postId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found post with id ${req.params.postId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete post with id " + req.params.postId
                });
            }
        } else res.send({ message: `Post was deleted successfully!` });
    });
};

// Delete all Posts from the database.
exports.deleteAll = (req, res) => {
    Post.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all posts."
            });
        else res.send({ message: `All posts were deleted successfully!` });
    });
};