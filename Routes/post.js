const express = require("express");

const requireAuth = require("../middlewares/requireAuth");

const { getAllPosts, createPost } = require("../Controllers/post");

const app = express.Router();
app.use(requireAuth);

app.route("/").get(getAllPosts).post(createPost);

module.exports = app;
