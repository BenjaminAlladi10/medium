import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

interface Blogstype{
    "content": string;
    "title": string;
    "id": string,
    "author": {
        "name": string
    },
    "createdAt" : string

}

export const useBlogs = ()=>{
    const[loading,setLoading] = useState(true);
    const[blogs,setBlogs] = useState<Blogstype[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setBlogs(response.data.blogs);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
    
        fetchBlogs();
    }, []);

    return {
        blogs ,
        loading
    }
}

export interface Blogtype{
    "content": string;
    "title": string;
    "id": string,
    "author": {
        "name": string
    },
    "createdAt" : string

}

export const useBlog = ({id} : {id :string}) =>{
    const [loading,setLoading] = useState(true);
    const [blog,setBlog] = useState<Blogtype>();

    useEffect(()=>{
        const fetchBlog = async () =>{
            try{
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}` , {
                    headers : {
                        Authorization : `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setBlog(response.data.blog);
                setLoading(false);
            }catch(e){
                console.error("Error fetching individual blog: check hook code", e);
            }
        }
        fetchBlog();
    },[])

    return {
        blog ,
        loading
    }

}