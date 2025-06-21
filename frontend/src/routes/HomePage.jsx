import { Link } from "react-router-dom";
import MainCategories from "../components/MainCategories";
import FeaturedPosts from "../components/FeaturedPosts";
import PostLists from "../components/PostLists";

const HomePage = ({ user }) => {

  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* <BreadCrumb /> */}
      <div className="flex gap-4">
        <Link to="/" className="text-forest-green">Home</Link>
        <span className="text-forest-green-light">•</span>
        <span className="text-blue-800">Blogs and Articles</span>
      </div>
      {/* <Introduction/> */}
      <div className="flex items-center justify-between">
        {/* titles */}
        <div className="">
          <h1 className="text-forest-green text-3xl md:text-5xl font-bold">
            Where Every Pixel Builds the Future 🎨
          </h1>
          <p className="mt-5 pr-2 text-md md:text-xl text-forest-green">
           Hey there!
            Welcome to your new favorite corner of the internet. Whether you're here to level up your skills, get inspired, or just nerd out over cool web stuff — you’re in the right place.
            We’re all about learning, creating, and having a blast while doing it.
            <br />
            So dive in, explore, and let’s make the web a whole lot more awesome — together. 💻
          </p>
        </div>
        {/* animatedButton */}
        {user && (
          <Link to="/write" className="hidden md:block relative">
            <svg
              viewBox="0 0 200 200"
              width="180"
              height="150"
              className="text-lg tracking-widest animate-spin animatedButton"
            >
              <path
                id="circlePath"
                fill="none"
                d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
              />
              <text>
                <textPath href="#circlePath" startOffset="0%">
                  Write your story•
                </textPath>
                <textPath href="#circlePath" startOffset="50%">
                  Share your idea•
                </textPath>
              </text>
            </svg>
            <button className="absolute top-0 right-0 left-0 bottom-0 m-auto w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <line x1="6" y1="18" x2="18" y2="6" />
                <polyline points="9 6 18 6 18 15" />
              </svg>
            </button>
          </Link>
        )}
      </div>
      {/* <Categories/> */}
      <MainCategories />
      {/* <FeaturedPost /> */}
      <FeaturedPosts />
      {/* <PostList /> */}
      <div className="">
        <h1 className="my-8 text-2xl text-forest-green">Recent Posts</h1>
        <PostLists/>
      </div>
    </div>
  );
};
export default HomePage;
