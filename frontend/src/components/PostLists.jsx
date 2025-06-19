import { useState, useEffect } from "react";
import PostItems from "./PostItems";
import { getAllPosts } from "../services/api";

const PostLists = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const result = await getAllPosts();

    if (result.success) {
      setPosts(result.data);
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-lg text-forest-green">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-forest-green">No posts found. Be the first to write one!</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 mb-8">
      {posts.map((post) => (
        <PostItems key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostLists;
