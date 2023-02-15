const router = require("express").Router();
const Post = require("../models/Post");

//create post
router.post("/", async (req, res, next) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update post
router.put("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(updatedPost);
    } else {
      res.status(401).json("you can only update your own post");
    }
  } catch (error) {
    res.status(500).json(err);
  }
});
//delete post
router.delete("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json("post deleted");
    } else {
      res.status(401).json("you can only delete your own post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//get post
router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get all posts
router.get("/", async (req, res, next) => {
  const username = req.query.user;
  const catname = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username: username });
    } else if (catname) {
      posts = await Post.find({
        categories: {
          $in: [catname],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(501).json(err);
  }
});

module.exports = router;
