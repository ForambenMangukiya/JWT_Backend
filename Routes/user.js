const express = require("express");
const { loginUser, signupUser } = require("../Controllers/user");

const app = express.Router();

// when u r login page u need to send something
app.post("/login", loginUser);
app.post("/signup", signupUser);

module.exports = app;
