import { Link } from "react-router-dom";
import backgroundImage from "../utils/logo.png";
import { Navbar } from "../components/Navbar";

export const Main = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b-2 border-black bg-white">
        <Navbar />
      </header>

      <main className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-4 bg-white">
        <div className="lg:col-span-7 flex flex-col justify-center space-y-4 px-6 lg:px-12">
          <div className="text-center lg:text-left">
            <h1 className="text-6xl sm:text-7xl lg:text-9xl font-serif pr-0 lg:pr-24">
              Human
            </h1>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-semibold pl-0 lg:pl-5">
              stories & ideas
            </h1>
          </div>
          <div className="text-center lg:text-left pt-4">
            <p className="text-lg sm:text-xl text-black font-serif p-3 lg:pr-12">
              A place to read, write, and deepen your understanding
            </p>
          </div>
          <div className="text-center lg:text-left pt-5">
            <div className="lg:pl-20 lg:ml-20">
              <Link to={"/signup"}>
                <button
                  type="button"
                  className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-serif rounded-3xl text-lg px-5 py-2.5 text-center inline-flex items-center"
                >
                  Start reading
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div
          className="lg:col-span-5 bg-cover bg-center rounded-sm"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "400px", // Adjusted for responsiveness
          }}
        ></div>
      </main>

      <footer className="bg-white border-t-2 border-black py-4 text-center">
        <p className="text-black font-serif">
          Scalable Blog Platform - A Modern Approach to Web Development
        </p>
      </footer>
    </div>
  );
};
