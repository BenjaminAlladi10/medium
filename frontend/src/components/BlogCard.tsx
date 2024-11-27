import { Link } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';
// import { getTokenPayload } from "../utils/utils";
interface BlogCard {
    id : string ,
    authorName : string ,
    title : string , 
    content : string ,
    createdAt : string
}

export const BlogCard = ({authorName,title,content,id,createdAt} : BlogCard) => {
    return <Link to={`/blog/${id}`}><div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
    <div className="flex">
        <div className="flex justify-center flex-col"><Avatar name={authorName[0] || "A"}/> </div>
        <div className="pl-2 font-extralight text-sm flex justify-center flex-col">{authorName} </div>
        <div className="pl-2 font-extralight text-sm flex justify-center flex-col">{":-)"}</div>
        <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">{createdAt.slice(0,10)}</div>
        <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">|</div>
        <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col"> Posted {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</div>
    </div>

    <div className="pt-2.5 text-xl font-semibold">
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
        <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-600 rounded-full dark:bg-gray-600">
            <span className="font-sm text-white dark:text-gray-300 text-">{authorName[0].toUpperCase() || "Anonymous"}</span>
        </div>
    );
}