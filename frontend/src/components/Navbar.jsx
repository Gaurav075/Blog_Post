import { useEffect, useRef, useState } from "react";
import Image from "./Image";
import { Link } from "react-router-dom";

const Navbar = ({ user, logout }) => {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const userMenuRef = useRef(null);

  //Close menu on click outside
  useEffect(() => {
    const handler = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  // Prevent body scroll and touch when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    };
  }, [open]);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* LOGO  */}

      <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-forest-green">
        <Image
          src="https://ik.imagekit.io/devabhi/logo.png"
          alt={"logo"}
          w={32}
          h={32}
        />
        <span>Beyond Ink.</span>
      </Link>

      {/* MOBILE MENU */}

      <div className="md:hidden" ref={menuRef}>
        <div
          className="cursor-pointer text-2xl text-forest-green"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "X" : "☰"}
        </div>

        {/* Mobile Links  */}
        <div
          className={`w-full h-screen flex flex-col items-center justify-center gap-8 font-medium text-lg fixed top-16 left-0 bg-[#D1E8E2] z-50 transform transition-transform duration-300 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            touchAction: open ? 'auto' : 'none',
            pointerEvents: open ? 'auto' : 'none'
          }}
        >
          <Link to="/" onClick={() => setOpen(false)} className="text-forest-green hover:text-blue-800 transition-colors">
            Home
          </Link>
          <Link to="/trending" onClick={() => setOpen(false)} className="text-forest-green hover:text-blue-800 transition-colors">
            Trending
          </Link>
          <Link to="/popular" onClick={() => setOpen(false)} className="text-forest-green hover:text-blue-800 transition-colors">
            Most Popular
          </Link>
          <Link to="/about" onClick={() => setOpen(false)} className="text-forest-green hover:text-blue-800 transition-colors">
            About
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setOpen(false)} className="text-forest-green">
                Dashboard
              </Link>
              <Link to="/write" onClick={() => setOpen(false)} className="text-forest-green">
                Write Post
              </Link>
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="py-2 px-4 rounded-3xl bg-red-600 text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)}>
              <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
                Log in👋🏻
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* DESKTOP MENU  */}

      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/" className="text-forest-green hover:text-blue-800 transition-colors">Home</Link>
        <Link to="/trending" className="text-forest-green hover:text-blue-800 transition-colors">Trending</Link>
        <Link to="/popular" className="text-forest-green hover:text-blue-800 transition-colors">Most Popular</Link>
        <Link to="/about" className="text-forest-green hover:text-blue-800 transition-colors">About</Link>

        {user ? (
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <button className="py-2 px-4 rounded-3xl bg-blue-600 text-white hover:bg-blue-700">
                Dashboard
              </button>
            </Link>
            <Link to="/write">
              <button className="py-2 px-4 rounded-3xl bg-green-600 text-white hover:bg-green-700">
                Write Post
              </button>
            </Link>
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="text-sm text-forest-green">{user.name || 'User'}</span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Link to="/login">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white hover:bg-blue-900">
              Log in👋🏻
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};
export default Navbar;
