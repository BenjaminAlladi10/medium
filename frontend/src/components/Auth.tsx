import { Link, Params } from "react-router-dom"
import { ChangeEvent, useState } from "react"
import { SignupType } from "@nikhil-duduka/commonzod"

export const Auth = ({type} : {type : "signin" | "signup"})=>{
    const [postInputs,setPostInputs] = useState<SignupType>({
        name : "" ,
        email : "" ,
        password : ""
    })
    return (
        <div className="flex justify-center h-screen flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-10">
                        <div  className="text-3xl font-extrabold">
                            Create An Account
                        </div>
                        <div className="text-slate-400">
                            Already Have An Account? <Link className="underline pl-2" to={"/Signin"}>Login</Link>
                        </div>
                    </div>
                    <div className="pt-4">
                    <LabelledInput label="Username" placeholder="Enter your username" onChange={(e)=>{
                        setPostInputs({...postInputs, name :e.target.value})
                    }}/>
                    <LabelledInput label="Email" placeholder="Enter your email" onChange={(e)=>{
                        setPostInputs({...postInputs, name :e.target.value})
                    }}/>
                    <LabelledInput label="password" type={"password"} placeholder="Enter Password" onChange={(e)=>{
                        setPostInputs({...postInputs, name :e.target.value})
                    }}/>
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
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input type = {type || "text"}  onChange = {onChange} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
        </div>
    )
} 