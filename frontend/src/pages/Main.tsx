import { Link } from "react-router-dom"
import backgroundImage from "../utils/logo.png"
import { Navbar } from "../components/Navbar"

export const Main = () => {
    return (
        <div>
            <div className="border-b-2 border-black  bg-white ">
                <Navbar></Navbar>
            </div>
            <div className="border-b-2 border-black grid grid-cols-12 gap-4 pt-0 bg-white">
                <div className="col-span-7 flex flex-col justify-center space-y-4">
                    <div className="text-center">
                        <h1 className="text-9xl font-serif pr-24">Human</h1>
                        <h1 className="text-7xl font-serif font-semibold pl-5">stories & ideas</h1>
                    </div>
                    <div className="text-center pt-4">
                        <p className="text-xl text-black font-serif p-3 pr-12">A place to read, write, and deepen your understanding</p>
                    </div>
                    <div className="text-left pt-5">
                        <div className="pl-20 ml-20">
                            <Link to={"/signup"}><button type="button" className="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-serif rounded-3xl text-lg px-5 py-2.5 text-center inline-flex items-center">
                            Start reading
                            </button></Link>
                        </div>
                    </div>
                </div>
                <div 
                    className="col-span-5 bg-cover bg-center rounded-sm" 
                    style={{ 
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        minHeight: '660px' // Ensures the div has a minimum height
                    }}
                >
                </div>
            </div>
            <div className=" bg-white pt-1">
                <p className="text-black text-center font-serif">Scalable Blog Platform - A Modern Approach to Web Development</p>
            </div>
            <div className=" bg-white">
                <p className="text-gray-200">hi</p>
            </div>
        </div>
    )
}