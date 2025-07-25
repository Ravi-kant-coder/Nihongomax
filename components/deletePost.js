const express = require("express");
const router = express.Router();
const Post = require("../../backend/model/Post.js");
const authMiddleware = require("../../backend/middleware/authMiddleware.js");

router.delete("/posts/:id", authMiddleware, async (req, res) => {
  console.log("DELETE route HIT");
  console.log("Post ID:", req.params.id);
  console.log("User object from authMiddleware:", req.user);
  const currentUserId = req.user?.userId;
  if (!currentUserId) {
    return res.status(401).json({ error: "Unauthorized: No userId found" });
  }

  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      console.log("Post nahi mili");
      return res.status(404).json({ error: "Post not found" });
    }

    console.log("Post ka user:", post.user.toString());
    console.log("Current user ID hai:", currentUserId);

    if (post.user.toString() !== currentUserId.toString()) {
      console.log("User authorized nahi hai");
      return res.status(403).json({ error: "Not authorized" });
    }

    await post.deleteOne();
    console.log("Ho gaya delete");
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("kuch eerver error ho gaya:", err);
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
