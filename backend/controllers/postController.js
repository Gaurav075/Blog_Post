import { validationResult } from "express-validator";
import Post from "../models/post.model.js";

// Create slug from title
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name img")
      .sort({ createdAt: -1 });
    
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single post by slug
export const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .populate("user", "name img");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Only increment visit count if incrementView is true (default) or not specified
    const incrementView = req.query.incrementView !== 'false';

    if (incrementView) {
      post.visit += 1;
      await post.save();
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single post by ID (for editing)
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("user", "name img");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new post
export const createPost = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array()
      });
    }

    const { title, content, desc, tags, category, img } = req.body;

    // Create slug
    const slug = createSlug(title);

    const post = await Post.create({
      user: req.user._id,
      title,
      slug,
      content,
      desc,
      tags: tags || [],
      category: category || "general",
      img
    });

    const populatedPost = await Post.findById(post._id).populate("user", "name img");

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update post
export const updatePost = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array()
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if user owns the post
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only edit your own posts" });
    }

    const { title, content, desc, tags, category, img } = req.body;

    // Update slug if title changed
    let slug = post.slug;
    if (title !== post.title) {
      slug = createSlug(title);
    }

    // Update the post
    post.title = title;
    post.slug = slug;
    post.content = content;
    post.desc = desc || post.desc;
    post.tags = tags || post.tags;
    post.category = category || post.category;
    post.img = img || post.img;

    await post.save();

    const updatedPost = await Post.findById(post._id).populate("user", "name img");
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if user owns the post
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own posts" });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
