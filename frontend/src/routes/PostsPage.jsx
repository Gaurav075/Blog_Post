import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PostItems from "../components/PostItems";
import { getAllPosts } from "../services/api";

const PostsPage = ({ user }) => {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  useEffect(() => {
    fetchPosts();
  }, [category, search]);

  const fetchPosts = async () => {
    setLoading(true);
    const result = await getAllPosts();
    
    if (result.success) {
      let filteredPosts = result.data;
      
      // Filter by category if specified
      if (category) {
        filteredPosts = filteredPosts.filter(post => 
          post.category.toLowerCase() === category.toLowerCase()
        );
      }
      
      // Filter by search term if specified
      if (search) {
        filteredPosts = filteredPosts.filter(post =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.desc?.toLowerCase().includes(search.toLowerCase()) ||
          post.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
        );
      }
      
      setPosts(filteredPosts);
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  const getCategoryTitle = () => {
    if (search) return `Search Results for "${search}"`;
    if (category) {
      return category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ') + ' Posts';
    }
    return 'All Posts';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-forest-green">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-forest-green">
          {getCategoryTitle()}
        </h1>

        {(category || search) && (
          <p className="text-forest-green-light">
            {posts.length} post{posts.length !== 1 ? 's' : ''} found
            {category && ` in ${category.replace('-', ' ')}`}
            {search && ` for "${search}"`}
          </p>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Posts List */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-forest-green mb-2">
            No posts found
          </h3>
          <p className="text-forest-green-light">
            {category || search
              ? "Try adjusting your filters or search terms"
              : "No posts available at the moment"
            }
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-12">
          {posts.map((post) => (
            <PostItems key={post._id} post={post} />
          ))}
        </div>
      )}

      {/* Pagination could be added here in the future */}
    </div>
  );
};

export default PostsPage;
