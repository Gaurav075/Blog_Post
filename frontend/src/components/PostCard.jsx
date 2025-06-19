import { Link } from "react-router-dom";
import Image from "./Image";

const PostCard = ({ post, rank = null, showRank = false }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200/50 overflow-hidden hover:shadow-md hover:bg-white/90 transition-all duration-200">
      {/* Image */}
      {post.img && (
        <div className="relative">
          <Image
            src={post.img}
            alt={post.title}
            className="w-full h-48 object-cover"
            w="400"
            h="200"
          />
          {/* Rank Badge */}
          {showRank && rank !== null && (
            <div className="absolute top-3 right-3">
              <span className={`text-white text-xs px-2 py-1 rounded font-medium ${
                rank === 1 ? 'bg-purple-600' : 'bg-blue-800'
              }`}>
                {rank === 1 ? '★' : `#${rank}`}
              </span>
            </div>
          )}
        </div>
      )}
      
      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <Link
          to={`/${post.slug}`}
          className="block hover:text-blue-800 transition-colors duration-200"
        >
          <h3 className="text-lg font-semibold text-forest-green mb-2 line-clamp-2">
            {post.title}
          </h3>
        </Link>

        {/* Meta Info */}
        <div className="flex items-center gap-2 text-sm text-forest-green-light mb-3">
          <span className="text-blue-800 font-medium">{post.user.name || 'Unknown'}</span>
          <span>•</span>
          <span>{formatDate(post.createdAt)}</span>
          <span>•</span>
          <span>{post.visit || 0} views</span>
        </div>

        {/* Description */}
        {post.desc && (
          <p className="text-forest-green text-sm leading-relaxed mb-4 line-clamp-3">
            {post.desc}
          </p>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="bg-gray-100 text-forest-green px-2 py-1 rounded text-xs">
                #{tag}
              </span>
            ))}
            {post.tags.length > 2 && (
              <span className="text-forest-green-light text-xs">+{post.tags.length - 2} more</span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <Link
            to={`/${post.slug}`}
            className="text-blue-800 hover:text-blue-600 font-medium text-sm"
          >
            Read more →
          </Link>
          <span className="text-forest-green capitalize text-xs bg-gray-50 px-2 py-1 rounded">
            {post.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
