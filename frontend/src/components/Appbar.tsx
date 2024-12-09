import { Link } from "react-router-dom"
export const Appbar= ()=>{
    return <div className="border-b flex justify-between px-10 py-4 cursor-pointer">
        <Link to={"/blogs"}>
            <div className="pt-3 flex justify-center flex-col font-black text-3xl font-serif">
                BLOG'S.COM
            </div>
        </Link>
        <div className="flex">

            <div className="flex justify-center flex-col pt-2 mr-1">
                <Link to={"/publish"}>
                    <button
                    type="button"
                    className="font-serif flex items-center justify-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-label="Write"
                        className="mr-2">
                    <path fill="currentColor" d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"/>
                    <path stroke="currentColor" d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 .354L19.5 6.5m-2-2 2 2"/> </svg>
                    Write...
                    </button></Link>
            </div>

            <div className="flex flex-col items-center  pt-2 pr-3">
                <Link to={"/signin"}>
                <button type="button" className="font-serif text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center mb-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-label="Profile"
                    className="mr-2">
                    <circle cx="12" cy="7" r="4.5" stroke="currentColor"></circle><path stroke="currentColor" strokeLinecap="round"
                    d="M3.5 21.5v-4.342C3.5 15.414 7.306 14 12 14s8.5 1.414 8.5 3.158V21.5"></path></svg>
                Signout
                </button> </Link>
            </div>
        </div>

    </div>

}