import { Link } from "react-router-dom";

interface BlogCard {
    id : string ,
    authorName : string ,
    title : string , 
    content : string ,
    publishedDate : string
}

export const BlogCard = ({authorName,title,content,publishedDate,id} : BlogCard) => {
    return <Link to={`/blog/${id}`}><div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
    <div className="flex">
        <div className="flex justify-center flex-col"><Avatar name={authorName}/> </div>
        <div className="pl-2 font-extralight text-sm flex justify-center flex-col">{authorName} </div>
        <div className="pl-2 font-extralight text-sm flex justify-center flex-col">{":-)"}</div>
        <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
            {new Date(publishedDate).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
            })}
        </div>
    </div>

    <div className="pt-2.5 text-xl font-serif font-semibold">
        {title}
    </div>

    <div className="text-md font-thin">
        {content.slice(0,100) +  "..."}
    </div>
    <div className="pt-4 text-slate-500 font-thin">
        {`${Math.ceil(content.length / 100)} min read`}
    </div>
</div></Link>
}

export function Avatar ({name: authorName} : {name: string}) {
    return (
        <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-xs text-gray-600 dark:text-gray-300">{authorName[0].toUpperCase() || "Anonymous"}</span>
        </div>
    );
}