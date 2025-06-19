import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost } from "../services/api";
import QuillEditor from "../components/QuillEditor";
import ImageUpload from "../components/ImageUpload";

const EditPost = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [tags, setTags] = useState('');
  const [img, setImg] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');

  const categories = [
    'general',
    'web-design', 
    'development',
    'databases',
    'devops',
    'marketing'
  ];

  useEffect(() => {
    if (user && id) {
      fetchPost();
    }
  }, [user, id]);

  const fetchPost = async () => {
    // Fetch post by ID for editing
    const result = await getPostById(id);
    
    if (result.success) {
      const post = result.data;
      
      // Check if user owns this post
      if (post.user._id !== user._id) {
        setError('You can only edit your own posts');
        setFetchLoading(false);
        return;
      }
      
      setTitle(post.title);
      setDesc(post.desc || '');
      setContent(post.content);
      setCategory(post.category);
      setTags(post.tags ? post.tags.join(', ') : '');
      setImg(post.img || '');
    } else {
      setError(result.message);
    }
    
    setFetchLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      setLoading(false);
      return;
    }

    const postData = {
      title: title.trim(),
      desc: desc.trim(),
      content,
      category,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      img: img.trim()
    };

    const result = await updatePost(id, postData);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">Please login to edit posts</div>
      </div>
    );
  }

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-forest-green">Loading post...</div>
      </div>
    );
  }

  if (error && fetchLoading === false && !title) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-forest-green">Edit Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-forest-green mb-2">
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-forest-green"
            placeholder="Enter post title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-forest-green mb-2">
            Description
          </label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-forest-green"
            placeholder="Brief description of your post"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-forest-green mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-forest-green"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-forest-green mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-forest-green"
              placeholder="react, javascript, web"
            />
          </div>
        </div>

        <ImageUpload
          onImageUpload={(imageUrl) => setImg(imageUrl)}
          currentImage={img}
          onImageRemove={() => setImg('')}
        />

        <div className="mb-16">
          <label className="block text-sm font-medium text-forest-green mb-2">
            Content *
          </label>
          <QuillEditor
            value={content}
            onChange={setContent}
            className="bg-white rounded-lg border border-gray-300"
            style={{
              height: '400px',
              marginBottom: '60px'
            }}
          />
        </div>

        <div className="flex gap-4 pt-8">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-900 disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Post'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="bg-gray-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
