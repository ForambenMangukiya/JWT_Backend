const Post = require("../Schemas/Post");

const getAllPosts = async (req, res) => {
  console.log(req.headers); // console ma headers dekhay
  console.log(req.body); // console ma headers dekhay ama je token nakhyu hoy e http://localhost:8080/posts and token ayathi ave http://localhost:8080/user/signup  email pws nakhvano pachhi, peli http://localhost:8080/posts  wala address prthi  ma check krvu

  try {
    const posts = await Post.find();
    if (!posts.length) {
      return res.status(200).json({ msg: "No posts found" });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  const { title, text } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }

  if (!text) {
    emptyFields.push("text");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  try {
    const post = await Post.create({ title, text });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllPosts, createPost };
