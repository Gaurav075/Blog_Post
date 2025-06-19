import { useState, useEffect } from "react";
import Comment from "./Comment";
import { getCommentsByPost, createComment } from "../services/api";

const Comments = ({ postId, user }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const fetchComments = async () => {
    const result = await getCommentsByPost(postId);
    if (result.success) {
      setComments(result.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('Please login to comment');
      return;
    }

    if (!newComment.trim()) {
      setError('Please write a comment');
      return;
    }

    setLoading(true);
    setError('');

    const result = await createComment({
      content: newComment,
      postId: postId
    });

    if (result.success) {
      setComments([result.data, ...comments]);
      setNewComment('');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-forest-green">
        Comments ({comments.length})
      </h2>

      {/* Add Comment Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="flex gap-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment here..."
            className="flex-1 p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-forest-green"
            rows="3"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-800 px-6 py-3 text-white font-medium rounded-xl hover:bg-blue-900 disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </form>
      ) : (
        <p className="text-forest-green bg-gray-100 p-4 rounded-xl">
          Please login to leave a comment
        </p>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              user={user}
              onDelete={() => fetchComments()}
            />
          ))
        ) : (
          <p className="text-forest-green-light text-center py-8">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};
export default Comments;
