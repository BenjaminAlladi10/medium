import { Blogtype } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"
import Mailer from "./Mailer"

export const MiniBlog = ({blog} : {blog : Blogtype}) =>{
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
                    <div className="pt-2 text-pretty font-serif">
                        {blog.content}
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

