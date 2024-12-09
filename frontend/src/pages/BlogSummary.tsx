import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks/blogContext'
import { useEffect, useState } from 'react';
// import axios from 'axios';

export default function BlogSummary() {

  const contextBlog= useBlog();
  const blogId= useParams().id;

//   console.log(contextBlog, blogId);

  const [summary, setSummary]= useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const getSummary= async()=>{
        try 
        {
            setLoading(true);
            // const res=await axios.post("", {
            //     content: contextBlog.content
            // });

            // console.log("res:", res);
            setTimeout(()=>setSummary("random"), 2000);
        } 
        catch (error) 
        {
            console.log("Error in generating summary", error);
        }
        finally
        {
            setLoading(false);
        }
    };
    getSummary();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen justify-center items-center bg-gray-50">
        {/* Loading Spinner */}
        <p className="animate-pulse text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
        {/* {blogId} {"\n"}
        {contextBlog?.content} */}
        <div className="bg-white shadow-md rounded-lg p-6 m-4 md:m-8 lg:m-12 w-full md:w-3/4 lg:w-1/2 mx-auto min-h-[50vh]">
            <div className="text-2xl font-semibold mb-4 text-gray-800">
                AI Powered Summary:
            </div>
            
            <div className="text-gray-600 mb-4 leading-relaxed text-sm md:text-base">
                {summary}
            </div>

            <div className="flex justify-start items-center space-x-2 text-sm text-gray-500">
                <span className="font-semibold">Generated for Blog:</span>
                <span className="text-blue-500">{blogId|| 'Unknown'}</span>
            </div>
        </div>
    </div>
  )
}
