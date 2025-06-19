import express from "express";
import {
  getAllPosts,
  getPostBySlug,
  getPostById,
  createPost,
  updatePost,
  deletePost
} from "../controllers/postController.js";
import { protect } from "../middleware/auth.js";
import { validatePost } from "../middleware/validation.js";

const router = express.Router();

// Post routes
router.get("/", getAllPosts);
router.get("/id/:id", getPostById); // New route for getting post by ID
router.get("/:slug", getPostBySlug);
router.post("/", protect, validatePost, createPost);
router.put("/:id", protect, validatePost, updatePost);
router.delete("/:id", protect, deletePost);

export default router;