import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./routes/HomePage";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import Write from "./routes/Write";
import SinglePostPage from "./routes/SinglePostPage";
import Dashboard from "./routes/Dashboard";
import EditPost from "./routes/EditPost";
import PostsPage from "./routes/PostsPage";
import AboutPage from "./routes/AboutPage";
import TrendingPage from "./routes/TrendingPage";
import MostPopularPage from "./routes/MostPopularPage";

const App = () => {
  // Simple user state management
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in when app starts
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-forest-green">Loading...</div>;
  }

  return (
    <Router>
      <div className='px-4 md:px-8 lg:px-16 xl:px-32 2xl:64'>
        <Navbar user={user} logout={logout} />

        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/posts" element={<PostsPage user={user} />} />
          <Route path="/trending" element={<TrendingPage user={user} />} />
          <Route path="/popular" element={<MostPopularPage user={user} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage login={login} />} />
          <Route path="/register" element={<RegisterPage login={login} />} />
          <Route path="/write" element={<Write user={user} />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/edit/:id" element={<EditPost user={user} />} />
          <Route path="/:slug" element={<SinglePostPage user={user} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;