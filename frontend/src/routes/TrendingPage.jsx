import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { getAllPosts } from "../services/api";

const TrendingPage = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTrendingPosts();
  }, []);

  const fetchTrendingPosts = async () => {
    const result = await getAllPosts();
    
    if (result.success) {
      // Sort posts by view count (trending = most viewed)
      const trendingPosts = result.data.sort((a, b) => (b.visit || 0) - (a.visit || 0));
      setPosts(trendingPosts);
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-forest-green">Loading trending posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-col gap-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex gap-2 text-sm mb-6">
          <Link to="/" className="text-forest-green hover:text-blue-800">Home</Link>
          <span className="text-forest-green-light">•</span>
          <span className="text-blue-800">Trending</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-forest-green mb-2">
              🔥 Trending Posts
            </h1>
            <p className="text-forest-green-light">
              Discover the most popular and engaging content ({posts.length} posts)
            </p>
          </div>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <PostCard
                key={post._id}
                post={post}
                rank={index + 1}
                showRank={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-bold text-forest-green mb-2">No Trending Posts Yet</h3>
            <p className="text-forest-green-light mb-6">
              Be the first to create content that captures everyone's attention!
            </p>
            {user && (
              <Link to="/write">
                <button className="bg-blue-800 text-white px-6 py-3 rounded hover:bg-blue-900">
                  Write Your First Post
                </button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingPage;
