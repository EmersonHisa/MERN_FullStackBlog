const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
//user update
router.put("/:id", async (req, res, next) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt();
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.body.userId,
        req.body,
        {
          new: true,
        }
      );
      const { password, ...others } = updatedUser._doc;
      res.status(200).json(others);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("you can only update your own account");
  }
});

//user delete
router.delete("/:id", async (req, res, next) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("success deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(500).json("user not found");
    }
  } else {
    res.status(401).json("you can only delete your own account");
  }
});

//user search
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json("user not found");
  }
});



module.exports = router;
