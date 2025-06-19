import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Image from "./Image";
import { getAllPosts } from "../services/api";

const FeaturedPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedPosts();
  }, []);

  const fetchFeaturedPosts = async () => {
    const result = await getAllPosts();
    
    if (result.success) {
      // Get the first 4 posts for featured section
      setPosts(result.data.slice(0, 4));
    }
    
    setLoading(false);
  };

  const formatDate = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffTime = Math.abs(now - postDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} week${Math.ceil(diffDays / 7) > 1 ? 's' : ''} ago`;
    return `${Math.ceil(diffDays / 30)} month${Math.ceil(diffDays / 30) > 1 ? 's' : ''} ago`;
  };

  if (loading) {
    return (
      <div className="mt-8 flex justify-center items-center py-8">
        <div className="text-lg text-forest-green">Loading featured posts...</div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="mt-8 flex justify-center items-center py-8">
        <div className="text-forest-green-light">No featured posts available</div>
      </div>
    );
  }

  const [mainPost, ...otherPosts] = posts;

  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      {/* Main Featured Post */}
      {mainPost && (
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          {/* Image */}
          {mainPost.img && (
            <div className="overflow-hidden rounded-2xl">
              <Image
                src={mainPost.img}
                className="object-cover w-full h-64"
                alt={mainPost.title}
                w="400"
                h="250"
              />
            </div>
          )}
          
          {/* Details */}
          <div className="flex items-center gap-4">
            <h1 className="font-semibold lg:text-lg text-forest-green">01.</h1>
            <span className="text-blue-800 lg:text-lg capitalize">{mainPost.category}</span>
            <span className="text-forest-green-light">{formatDate(mainPost.createdAt)}</span>
          </div>

          {/* Title */}
          <Link
            to={`/${mainPost.slug}`}
            className="hover:text-blue-800 text-xl lg:text-3xl font-semibold lg:font-bold text-forest-green"
          >
            {mainPost.title}
          </Link>

          {/* Description */}
          {mainPost.desc && (
            <p className="text-forest-green mt-2">
              {mainPost.desc}
            </p>
          )}
          
          {/* Tags */}
          {mainPost.tags && mainPost.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {mainPost.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Other Featured Posts */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {otherPosts.map((post, index) => (
          <div key={post._id} className="flex justify-between gap-4">
            {/* Image */}
            <div className="overflow-hidden rounded-2xl w-1/3 h-32">
              {post.img ? (
                <Image
                  src={post.img}
                  className="object-cover w-full h-full"
                  alt={post.title}
                  w="150"
                  h="120"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">No Image</span>
                </div>
              )}
            </div>
            
            {/* Content */}
            <div className="w-2/3">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-forest-green">0{index + 2}.</span>
                <span className="text-blue-800 capitalize">{post.category}</span>
                <span className="text-forest-green-light text-sm">{formatDate(post.createdAt)}</span>
              </div>

              <Link
                to={`/${post.slug}`}
                className="font-semibold hover:text-blue-800 transition-colors block mb-2 text-forest-green"
              >
                {post.title}
              </Link>

              {/* Description */}
              {post.desc && (
                <p className="text-forest-green text-sm line-clamp-2">
                  {post.desc.length > 100 ? `${post.desc.substring(0, 100)}...` : post.desc}
                </p>
              )}
              
              {/* View count */}
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-500 text-xs">{post.visit} views</span>
                {post.tags && post.tags.length > 0 && (
                  <span className="text-blue-600 text-xs">#{post.tags[0]}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPosts;
