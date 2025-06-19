import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const MainCategories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Get current category from URL
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get('category');

  const categories = [
    { name: 'All Posts', path: '/posts', key: null },
    { name: 'Web Design', path: '/posts?category=web-design', key: 'web-design' },
    { name: 'Development', path: '/posts?category=development', key: 'development' },
    { name: 'Databases', path: '/posts?category=databases', key: 'databases' },
    { name: 'DevOps', path: '/posts?category=devops', key: 'devops' },
    { name: 'Marketing', path: '/posts?category=marketing', key: 'marketing' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/posts?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const isActive = (categoryKey) => {
    if (categoryKey === null) {
      return !currentCategory && !searchParams.get('search');
    }
    return currentCategory === categoryKey;
  };

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8">
        {/* Category Links */}
        <div className="flex-1 flex items-center justify-between flex-wrap">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className={`rounded-full px-4 py-2 transition-colors ${
                isActive(category.key)
                  ? 'bg-blue-800 text-white'
                  : 'hover:bg-blue-50 text-forest-green'
              }`}
            >
              {category.name}
            </Link>
          ))}
          <span className="text-xl font-medium text-gray-300">|</span>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="bg-gray-200 p-2 rounded-full flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="gray"
            strokeWidth="2"
          >
            <circle cx="10.5" cy="10.5" r="7.5" />
            <line x1="17" y1="17" x2="22" y2="22" />
          </svg>
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none border-none w-32 text-sm"
          />
        </form>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden bg-white rounded-2xl p-4 shadow-lg">
        {/* Search */}
        <form onSubmit={handleSearch} className="bg-gray-100 p-3 rounded-xl flex items-center gap-2 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="gray"
            strokeWidth="2"
          >
            <circle cx="10.5" cy="10.5" r="7.5" />
            <line x1="17" y1="17" x2="22" y2="22" />
          </svg>
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none border-none flex-1 text-sm text-forest-green"
          />
        </form>

        {/* Category Links */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className={`rounded-full px-3 py-2 text-sm transition-colors ${
                isActive(category.key)
                  ? 'bg-blue-800 text-white'
                  : 'bg-gray-100 text-forest-green hover:bg-blue-50'
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
export default MainCategories;
