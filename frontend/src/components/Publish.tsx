import { useState } from "react";
import { Appbar } from "./Appbar"

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
  
    const handlePublish = () => {
      console.log("Publishing Blog:", { title, description });
      // Add your blog publish logic here
    };
  
    return ( <>
        <div>
            <Appbar/>
        </div>
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-100 p-4">
          <div className="bg-gray-800 rounded-xl shadow-2xl max-w-xl w-full p-8 border border-yellow-500">
            <h2 className="text-4xl font-extrabold text-white mb-6 text-center uppercase tracking-widest">
              Publish Your Blog
            </h2>
            <div className="mb-5">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Blog Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="The Dark Knight's Thoughts..."
                className="w-full px-5 py-3 border border-gray-700 rounded-lg bg-gray-700 text-yellow-400 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-yellow-500"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Blog Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What's on Gotham's mind tonight?"
                className="w-full px-5 py-3 border border-gray-700 rounded-lg bg-gray-700 text-yellow-400 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-yellow-500 h-36 resize-none"
              />
            </div>
            <button
              onClick={handlePublish}
              disabled={!title || !description}
              className={`w-full py-3 px-6 text-lg font-semibold rounded-lg uppercase tracking-widest transition-all duration-300 ${
                title && description
                  ? "bg-blue-600 text-gray-900 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-400"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              Publish Blog
            </button>
          </div>
        </div>
      </>);
}