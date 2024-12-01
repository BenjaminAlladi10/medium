import { Appbar } from "../components/Appbar";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { MiniBlog } from "../components/MiniBlog";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";
export const Blog = ()=>{
    const {id} = useParams();
    const {blog,loading} = useBlog({
        id : id || ""
    });
    if(loading || !blog){
        return(<div>
            <Appbar/>
            <div className="flex justify-center my-8">
                <div className="grid grid-cols-2">
                    <div className="space-y-4 pl-10 ml-10">
                        <BlogSkeleton />
                    </div>
                    <div className="pl-10 ml-10">
                        <BlogSkeleton />
                    </div>
                </div>
            </div>
        </div>)
    }
    return (
    <>
       
        <MiniBlog blog={blog}></MiniBlog>
    </>
    ) 
}