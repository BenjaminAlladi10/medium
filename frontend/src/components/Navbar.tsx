import { Link } from "react-router-dom"
export const Navbar= ()=>{
    return <div className="border-b flex justify-between px-10 py-4 cursor-pointer">
        <Link to={"/blogs"}>
            <div className="pt-3 flex justify-center flex-col font-black text-3xl font-serif">
                BLOG'S.COM
            </div>
        </Link>
        <div className="flex">
            <div className="flex justify-center flex-col pt-2 mr-2">
                <Link to={"/signin"}><button type="button" className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-sm font-serif rounded-3xl text-lg px-5 py-2.5 text-center inline-flex items-center">
                    Sign in
                </button></Link>
            </div>

            <div className="flex flex-col items-center  pt-2 pr-3">
                <Link to={"/signup"}><button type="button" className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-sm font-serif rounded-3xl text-lg px-5 py-2.5 text-center inline-flex items-center">
                    Sign up
                </button></Link>
            </div>
        </div>

    </div>

}