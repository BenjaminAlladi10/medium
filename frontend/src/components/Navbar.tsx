import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="border-b flex justify-between px-10 py-4 cursor-pointer items-center">
     
      <Link to={"/blogs"}>
        <div className="pt-3 flex justify-center flex-col font-black text-3xl font-serif">
          BLOG'S.COM
        </div>
      </Link>

      <button
        className="block md:hidden text-3xl focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>

      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute md:static top-[70px] left-0 w-full md:w-auto bg-white md:flex justify-end md:items-center transition-all duration-300 z-50`}
      >
        <div className="flex flex-col md:flex-row md:space-x-4 items-center md:bg-transparent bg-gray-50 p-4 md:p-0">
          {/* Sign In Button */}
          <div className="flex justify-center flex-col pt-2 mr-2">
            <Link to={"/signin"}>
              <button
                type="button"
                className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-sm font-serif rounded-3xl text-lg px-5 py-2.5 text-center inline-flex items-center"
              >
                Sign in
              </button>
            </Link>
          </div>

          {/* Sign Up Button */}
          <div className="flex flex-col items-center pt-2 pr-3">
            <Link to={"/signup"}>
              <button
                type="button"
                className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-sm font-serif rounded-3xl text-lg px-5 py-2.5 text-center inline-flex items-center"
              >
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
