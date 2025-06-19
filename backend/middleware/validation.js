import { body } from "express-validator";

// Simple validation rules for user registration
export const validateRegister = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
];

// Simple validation rules for user login
export const validateLogin = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
];

// Simple validation rules for creating posts
export const validatePost = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage("Title is required and must be less than 200 characters"),

  body("content")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Content is required"),

  body("desc")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description must be less than 500 characters"),

  body("category")
    .optional()
    .isIn(["general", "web-design", "development", "databases", "devops", "marketing"])
    .withMessage("Invalid category")
];

// Simple validation rules for comments
export const validateComment = [
  body("content")
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage("Comment content is required and must be less than 1000 characters"),

  body("postId")
    .isMongoId()
    .withMessage("Valid post ID is required")
];