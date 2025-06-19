import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/api";
import QuillEditor from "../components/QuillEditor";
import ImageUpload from "../components/ImageUpload";

const Write = ({ user }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [tags, setTags] = useState('');
  const [img, setImg] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold mb-4 text-forest-green">Please log in to write a post</h2>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Convert tags string to array
    const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

    const postData = {
      title,
      desc,
      content,
      category,
      tags: tagsArray,
      img
    };

    const result = await createPost(postData);

    if (result.success) {
      navigate(`/${result.data.slug}`);
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-forest-green mb-6">Create a new post</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <ImageUpload
          onImageUpload={(imageUrl) => setImg(imageUrl)}
          currentImage={img}
          onImageRemove={() => setImg('')}
        />

            <div>
              <label className="block text-sm font-medium text-forest-green mb-2">
                Title *
              </label>
              <input
                className="w-full text-2xl sm:text-3xl lg:text-4xl font-semibold bg-transparent border-none outline-none focus:ring-0 placeholder-gray-400 text-forest-green"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Insert your title here"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-forest-green mb-2">
                  Category
                </label>
                <select
                  className="w-full p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-forest-green"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="general">General</option>
                  <option value="web-design">Web Design</option>
                  <option value="development">Development</option>
                  <option value="databases">Databases</option>
                  <option value="devops">DevOps</option>
                  <option value="marketing">Marketing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-forest-green mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-forest-green"
                  placeholder="react, javascript, web"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-forest-green mb-2">
                Description
              </label>
              <textarea
                className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-forest-green"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Add a short description of your post"
                rows="3"
              />
            </div>

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
                placeholder="Write your post content here..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white font-medium rounded-lg px-8 py-3 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Publishing...' : 'Publish Post'}
              </button>

              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="bg-gray-600 text-white font-medium rounded-lg px-8 py-3 hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Write;
