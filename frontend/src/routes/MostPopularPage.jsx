import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { getAllPosts } from "../services/api";

const MostPopularPage = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeFilter, setTimeFilter] = useState('all'); // all, week, month

  useEffect(() => {
    fetchPopularPosts();
  }, [timeFilter]);

  const fetchPopularPosts = async () => {
    const result = await getAllPosts();
    
    if (result.success) {
      let filteredPosts = result.data;
      
      // Filter by time period
      if (timeFilter !== 'all') {
        const now = new Date();
        const timeLimit = new Date();
        
        if (timeFilter === 'week') {
          timeLimit.setDate(now.getDate() - 7);
        } else if (timeFilter === 'month') {
          timeLimit.setMonth(now.getMonth() - 1);
        }
        
        filteredPosts = result.data.filter(post => 
          new Date(post.createdAt) >= timeLimit
        );
      }
      
      // Sort by popularity (views + engagement score)
      const popularPosts = filteredPosts.sort((a, b) => {
        const scoreA = (a.visit || 0) + (a.comments?.length || 0) * 2;
        const scoreB = (b.visit || 0) + (b.comments?.length || 0) * 2;
        return scoreB - scoreA;
      });
      
      setPosts(popularPosts);
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-forest-green">Loading popular posts...</div>
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
          <span className="text-blue-800">Most Popular</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-forest-green mb-2">
              ⭐ Most Popular Posts
            </h1>
            <p className="text-forest-green-light">
              The most loved and engaging content from our community ({posts.length} posts)
            </p>
          </div>
        </div>

        {/* Time Filter */}
        <div className="flex flex-wrap gap-4 items-center mb-8">
          <span className="text-forest-green font-medium">Filter by:</span>
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'All Time' },
              { key: 'month', label: 'This Month' },
              { key: 'week', label: 'This Week' }
            ].map(filter => (
              <button
                key={filter.key}
                onClick={() => setTimeFilter(filter.key)}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  timeFilter === filter.key
                    ? 'bg-blue-800 text-white'
                    : 'bg-gray-100 text-forest-green hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
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
            <h3 className="text-xl font-bold text-forest-green mb-2">
              No Popular Posts {timeFilter !== 'all' ? `for ${timeFilter === 'week' ? 'this week' : 'this month'}` : 'yet'}
            </h3>
            <p className="text-forest-green-light mb-6">
              {timeFilter !== 'all'
                ? 'Try selecting a different time period or create some engaging content!'
                : 'Be the first to create content that becomes popular!'
              }
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

export default MostPopularPage;
