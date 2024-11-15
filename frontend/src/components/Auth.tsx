import { Link,useNavigate } from "react-router-dom"
import { ChangeEvent, useState } from "react"
import { SignupType } from "@nikhil-duduka/commonzod"
import axios from  "axios"
import {BACKEND_URL} from "../config.ts"
export const Auth = ({type} : {type : "signin" | "signup"})=>{
    const navigate = useNavigate();
    const [postInputs,setPostInputs] = useState<SignupType>({
        name : "" ,
        email : "" ,
        password : ""
    });

    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,postInputs)
            const jwt = await response.data.jwt;
            localStorage.setItem("token",jwt)
            navigate("/blogs")
        }catch(e){
            //alert 
            alert("check sendrequest function");
        }
    }

    return (
        <div className="flex justify-center h-screen flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div  className="text-3xl font-extrabold">
                            Create An Account
                        </div>
                        <div className="text-slate-400">
                            {type === "signin" ? "Don't Have An Account?" : "Already Have An Account?"} <Link className="underline pl-2 text-blue-600" to={type === "signin" ? "/signup" : "/signin"}>
                            {type === "signin" ? "Sign up" : "Sign in"}
                            </Link>
                        </div>
                    </div>
                    <div className="pt-4">
                    {type === "signup" ? <LabelledInput label="Username" placeholder="Enter your username" onChange={(e)=>{
                        setPostInputs({...postInputs, name :e.target.value})
                    }}/> : null}
                    <LabelledInput label="Email" placeholder="Enter your email" onChange={(e)=>{
                        setPostInputs({...postInputs, email :e.target.value})
                    }}/>
                    <LabelledInput label="password" type={"password"} placeholder="Enter Password" onChange={(e)=>{
                        setPostInputs({...postInputs, password :e.target.value})
                    }}/>

                    <button onClick={sendRequest} type="button" className=" mt-7 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">{type === "signup" ? "Sign up" : "Sign in"}</button>
                    </div>
                </div>
            </div>
        </div>
 
    )
}


interface LabelledInputType {
    label : string ,
    placeholder : string , 
    onChange : (e : ChangeEvent<HTMLInputElement>) => void ,
    type? : string 
}

export function LabelledInput({label , placeholder,onChange,type} : LabelledInputType){

    return(
        <div>
            <div>
            <label className="pt-2 block mb-2 text-sm font-semibold text-gray-900">{label}</label>
            <input type = {type || "text"}  onChange = {onChange} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
        </div>
    )
} 