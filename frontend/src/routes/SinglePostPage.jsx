import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Image from "../components/Image";
import Comments from "../components/Comments";
import { getPostBySlug } from "../services/api";

const SinglePostPage = ({ user }) => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const hasIncrementedView = useRef(false);

  useEffect(() => {
    // Reset the view increment flag when slug changes
    hasIncrementedView.current = false;
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    // Only increment view if we haven't already done so for this post
    const shouldIncrementView = !hasIncrementedView.current;

    const result = await getPostBySlug(slug, shouldIncrementView);

    if (result.success) {
      setPost(result.data);
      // Mark that we've incremented the view for this post
      hasIncrementedView.current = true;
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-forest-green">Loading post...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">{error || "Post not found"}</div>
      </div>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-forest-green">
          {post.title}
        </h1>

        <div className="flex items-center gap-2 text-forest-green-light text-sm mb-4">
          <span>By</span>
          <span className="text-blue-800 font-medium">{post.user.name || 'Unknown Author'}</span>
          <span>•</span>
          <span className="capitalize">{post.category}</span>
          <span>•</span>
          <span>{formatDate(post.createdAt)}</span>
          <span>•</span>
          <span>{post.visit} views</span>
        </div>

        {post.desc && (
          <p className="text-forest-green text-lg mb-6">
            {post.desc}
          </p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {post.img && (
          <div className="mb-8">
            <Image
              src={post.img}
              className="rounded-lg object-cover w-full h-64 md:h-96"
              alt={post.title}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="prose max-w-none mb-12">
        <div
          className="text-forest-green leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      {/* Comments Section */}
      <Comments postId={post._id} user={user} />
    </div>
  );
};

export default SinglePostPage;
