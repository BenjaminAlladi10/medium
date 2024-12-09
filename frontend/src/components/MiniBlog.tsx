import { useContext } from "react"
import { Blogtype } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"
import Mailer from "./Mailer"
import { BlogContext } from "../hooks/blogContext"
import { useNavigate } from "react-router-dom"

export const MiniBlog = ({blog} : {blog : Blogtype}) =>{

    const navigate= useNavigate();

    const {contextBlog, setBlog}= useContext(BlogContext);
    console.log("contextBlog:", contextBlog);

    const handleClick= ()=>{
        setBlog(blog);
        navigate(`/ai-powered-summary/${blog.id}`);
    };

    return ( 
        <div>
        <Appbar></Appbar>
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                <div className="col-span-8">
                    <div className="text-5xl font-serif font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 py-3">
                        {new Date(blog.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric', month: 'long',day: 'numeric'
})}
                    </div>
                    <div className="pt-2 text-pretty font-serif flex flex-col items-start">
                        <div>{blog.content}</div>

                        <button onClick={handleClick} className="font-serif self-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-6 py-2.5 me-2 mb-2 md:mt-2 disabled:cursor-not-allowed active:scale-95 hover:shadow-md">
                            Get Summary
                        </button>
                    </div>

                </div>
                <div className="col-span-4 pl-8">
                    <div className="font-extrabold text-blue-600/100 dark:text-blue-500/100">
                        Author
                    </div>
                    <div className="pt-1 flex">
                       <div className="pr-2 flex flex-col justify-center">
                        <Avatar name={blog.author.name}></Avatar>
                       </div>
                        <div className="text-xl font-bold">
                            {(blog.author.name) || "Anonymous"}
                        </div>
                    </div>
                    <div className="pt-1 text-slate-500 pl-7">
                            {"Where Words Create Worlds – Dive into Stories "}
                            <div>
                            <span className="font-bold text-sm text-blue-600/100 dark:text-blue-500/100"> {`id :-)  ${blog.id}`}</span>
                            </div>
                    </div>
                    <div>
                        <Mailer></Mailer>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

