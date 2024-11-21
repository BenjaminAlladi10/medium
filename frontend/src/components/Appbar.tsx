import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"
export const Appbar= ()=>{
    return <div className="border-b flex justify-between px-10 py-4 cursor-pointer">
        <Link to={"/blogs"}>
            <div className="pt-3 flex justify-center flex-col font-black">
                BLOG'S.COM
            </div>
        </Link>
        <div className="flex">
            <div className="flex justify-center flex-col pt-2 mr-6">
                <Link to={"/publish"}>
                    <button type="button" className="flex justify-center flex-col text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Create Blogs</button>
                </Link>
            </div>
            
            <div className="bg-gray-600 px-1  flex justify-center flex-col">
                <Avatar name="Nik"></Avatar>
            </div>
        </div>

    </div>

}