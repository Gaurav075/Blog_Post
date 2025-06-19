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
            Designing the Future, One Pixel at a Time 🎨
          </h1>
          <p className="mt-5 pr-2 text-md md:text-xl text-forest-green">
            We’re thrilled to have you here! This space is all about exploring
            the endless possibilities of the web. Whether you are looking to
            learn something new or just get inspired, we’ve got you covered.
            <br />
            Dive in and let’s make the web more fun together!
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
