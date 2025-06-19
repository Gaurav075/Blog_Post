import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="mt-4 flex flex-col gap-12">
      {/* Breadcrumb */}
      <div className="flex gap-2 text-sm">
        <Link to="/" className="text-forest-green hover:text-blue-800">Home</Link>
        <span className="text-forest-green-light">•</span>
        <span className="text-blue-800">About</span>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-green-50/30 rounded-3xl"></div>
        <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/50 shadow-lg">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-blue-800/10 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-blue-800 rounded-full animate-pulse"></span>
              Welcome to Beyond Ink
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-forest-green mb-6 leading-tight">
              Where Stories Come to
              <span className="text-blue-800 block">Life ✨</span>
            </h1>
            <p className="text-xl text-forest-green-light leading-relaxed mb-8 max-w-2xl mx-auto">
              A platform where stories transcend boundaries and ideas flow beyond conventional limits.
              Join our community of passionate writers and readers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <button className="bg-blue-800 text-white px-8 py-4 rounded-xl hover:bg-blue-900 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Start Writing Today
                </button>
              </Link>
              <Link to="/posts">
                <button className="border-2 border-blue-800 text-blue-800 px-8 py-4 rounded-xl hover:bg-blue-800 hover:text-white transition-all duration-200 font-medium">
                  Explore Stories
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-forest-green mb-6">Our Mission 🎯</h2>
          <div className="space-y-6 text-lg text-forest-green leading-relaxed">
            <p>
              Beyond Ink is more than just a blogging platform—it's a <span className="font-semibold text-blue-800">digital sanctuary</span> where writers,
              thinkers, and creators come together to share their unique perspectives with the world.
            </p>
            <p>
              We believe that every story matters, every idea has value, and every voice deserves to be heard.
              Our platform empowers you to go <span className="font-semibold text-blue-800">beyond traditional boundaries</span> and express yourself freely.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div>
        <h3 className="text-3xl font-bold text-forest-green text-center mb-12">What We Offer 🚀</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-blue-800/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-800/20 transition-colors">
              <span className="text-2xl">✍️</span>
            </div>
            <h4 className="font-bold text-forest-green mb-2">Easy Writing</h4>
            <p className="text-sm text-forest-green-light">Intuitive editor with rich formatting options</p>
          </div>

          <div className="group bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-green-600/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-600/20 transition-colors">
              <span className="text-2xl">🌍</span>
            </div>
            <h4 className="font-bold text-forest-green mb-2">Global Community</h4>
            <p className="text-sm text-forest-green-light">Connect with writers worldwide</p>
          </div>

          <div className="group bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-purple-600/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-600/20 transition-colors">
              <span className="text-2xl">🎨</span>
            </div>
            <h4 className="font-bold text-forest-green mb-2">Rich Media</h4>
            <p className="text-sm text-forest-green-light">Enhance stories with images and multimedia</p>
          </div>

          <div className="group bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-orange-600/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-600/20 transition-colors">
              <span className="text-2xl">💬</span>
            </div>
            <h4 className="font-bold text-forest-green mb-2">Engage & Discuss</h4>
            <p className="text-sm text-forest-green-light">Foster meaningful conversations</p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="group bg-white/50 backdrop-blur-sm rounded-xl p-8 border border-white/50 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="w-16 h-16 bg-blue-800/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-800/20 transition-colors">
            <span className="text-3xl">🎭</span>
          </div>
          <h4 className="text-xl font-bold text-forest-green mb-3">Authenticity</h4>
          <p className="text-forest-green-light leading-relaxed">Genuine voices and original perspectives that inspire and connect</p>
        </div>

        <div className="group bg-white/50 backdrop-blur-sm rounded-xl p-8 border border-white/50 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="w-16 h-16 bg-green-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600/20 transition-colors">
            <span className="text-3xl">🤝</span>
          </div>
          <h4 className="text-xl font-bold text-forest-green mb-3">Inclusivity</h4>
          <p className="text-forest-green-light leading-relaxed">Everyone's story matters, every voice deserves to be heard</p>
        </div>

        <div className="group bg-white/50 backdrop-blur-sm rounded-xl p-8 border border-white/50 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="w-16 h-16 bg-purple-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600/20 transition-colors">
            <span className="text-3xl">📈</span>
          </div>
          <h4 className="text-xl font-bold text-forest-green mb-3">Growth</h4>
          <p className="text-forest-green-light leading-relaxed">Supporting continuous improvement and creative development</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/10 to-green-600/10 rounded-3xl"></div>
        <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/50 shadow-lg text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-forest-green mb-4">Ready to Start Your Journey? 🚀</h3>
          <p className="text-lg text-forest-green-light mb-8 max-w-2xl mx-auto">
            Join our community of passionate writers and readers. Share your story, discover amazing content, and connect with like-minded creators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <button className="bg-blue-800 text-white px-8 py-4 rounded-xl hover:bg-blue-900 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Join the Community
              </button>
            </Link>
            <Link to="/posts">
              <button className="border-2 border-blue-800 text-blue-800 px-8 py-4 rounded-xl hover:bg-blue-800 hover:text-white transition-all duration-200 font-medium">
                Explore Stories
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
