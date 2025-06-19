import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import uploadRouter from "./routes/upload.route.js";
import connectDB from "./lib/connectDB.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: true, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Health check route
app.get("/", (_req, res) => {
  res.json({
    message: "Blog API is running!",
    status: "success",
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/upload", uploadRouter);

const PORT = process.env.PORT || 3001;

// Connect to database
connectDB();

// For Vercel deployment
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export the app for Vercel
export default app;