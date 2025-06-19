import { Link } from "react-router-dom";
import Image from "./Image";

const PostItems = ({ post }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* Image */}
      {post.img && (
        <div className="md:hidden xl:block xl:w-1/3">
          <Image
            src={post.img}
            alt={post.title}
            className="rounded-2xl object-cover w-full h-64"
            w="400"
            h="250"
          />
        </div>
      )}
      
      {/* Details */}
      <div className="flex flex-col gap-4 flex-1">
        <Link
          to={`/${post.slug}`}
          className="hover:text-blue-800 transition duration-200 text-2xl md:text-3xl font-semibold text-forest-green"
        >
          {post.title}
        </Link>

        <div className="flex items-center gap-2 text-forest-green-light text-sm">
          <span>Written by</span>
          <span className="text-blue-800 font-medium">{post.user.name || 'Unknown Author'}</span>
          <span>on</span>
          <span className="text-blue-800 capitalize">{post.category}</span>
          <span>{formatDate(post.createdAt)}</span>
        </div>

        {post.desc && (
          <p className="text-forest-green leading-relaxed">
            {post.desc}
          </p>
        )}
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="bg-gray-100 text-forest-green px-2 py-1 rounded text-sm">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <Link
            to={`/${post.slug}`}
            className="text-blue-800 hover:text-blue-600 font-medium"
          >
            Read more →
          </Link>
          <span className="text-forest-green-light text-sm">{post.visit} views</span>
        </div>
      </div>
    </div>
  );
};

export default PostItems;
