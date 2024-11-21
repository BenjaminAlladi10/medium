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
    if(loading){
        return(<div>
            <Appbar/>
            <div className="flex justify-center">
                <div>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
                    <BlogSkeleton/>
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