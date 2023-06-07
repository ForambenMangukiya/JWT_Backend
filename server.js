const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("colors");
const connectDB = require("./dbinit");

const userRoutes = require("./routes/user");
const postRoutes = require("./Routes/post");

const PORT = process.env.PORT || 8080;

connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes); // localhost ma 8080 pachhi user and signup and login lakhvu http://localhost:8080/user/signup method post
app.use("/posts", postRoutes); // http://localhost:8080/posts paste tzhis and GET methods routes post.js ma app.use comment krine

app.get("/", (req, res) => {
  res.send("welcome to my API");
});

app.listen(PORT, () => {
  console.log(`server running number  ${PORT}`.rainbow);
});
