import { deleteComment } from "../services/api";

const Comment = ({ comment, user, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      const result = await deleteComment(comment._id);
      if (result.success) {
        onDelete();
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const canDelete = user && user._id === comment.user._id;

  return (
    <div className="p-4 bg-gray-50 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
            {comment.user.name ? comment.user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <span className="font-medium text-forest-green">{comment.user.name || 'Unknown User'}</span>
            <span className="text-sm text-forest-green-light ml-2">{formatDate(comment.createdAt)}</span>
          </div>
        </div>

        {canDelete && (
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Delete
          </button>
        )}
      </div>

      <div className="mt-3">
        <p className="text-forest-green">{comment.content}</p>
      </div>
    </div>
  );
};
export default Comment;
