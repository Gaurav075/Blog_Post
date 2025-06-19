import express from "express";
import {
  getCommentsByPost,
  createComment,
  deleteComment
} from "../controllers/commentController.js";
import { protect } from "../middleware/auth.js";
import { validateComment } from "../middleware/validation.js";

const router = express.Router();

// Comment routes
router.get("/:postId", getCommentsByPost);
router.post("/", protect, validateComment, createComment);
router.delete("/:id", protect, deleteComment);

export default router;