import {createContext, useContext} from "react";

interface BlogContextType{
    contextBlog: any;
    setBlog: any; 
}

export const BlogContext= createContext<BlogContextType>({
    contextBlog:"",
    setBlog: ()=>{}
});
// console.log(BlogContext);

export const useBlog= ():any=>{
    const {contextBlog}= useContext(BlogContext);
    return contextBlog;
};

export default BlogContext.Provider;