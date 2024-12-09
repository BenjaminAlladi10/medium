import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks/blogContext'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';
export default function BlogSummary() {

  const contextBlog= useBlog();
  const blogId= useParams().id;
  const navigate= useNavigate();

//   console.log(contextBlog, blogId);

  const [summary, setSummary]= useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const getSummary= async()=>{
        try 
        {
            setLoading(true);
            const response = await axios.post(
              `${BACKEND_URL}/api/v1/blog/summary`,
              {content  : contextBlog.content},
              { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            setSummary(response.data.summary);
            console.log(response.data.summary);
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
        <div className="bg-white shadow-md rounded-lg p-6 m-4 md:m-8 lg:m-12 w-full md:w-3/4 lg:w-1/2 mx-auto min-h-[40vh]">
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
            <div className='flex justify-center pt-4'>
                <button onClick={() => navigate(-1)} className="font-serif self-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-6 py-2.5 me-2 mb-2 md:mt-2 disabled:cursor-not-allowed active:scale-95 hover:shadow-md">
                            Close
                </button>
            </div>
        </div>
    </div>
  )
}
