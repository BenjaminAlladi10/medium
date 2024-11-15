import { Quote } from "../components/Quote"
import {Auth} from "../components/Auth"

export const Signin = ()=>{
    return (
    <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
            <Auth type="signin"/>
            </div>
            {/* if you go above md breakpoint it would go invisible */}
            <div  className="hidden lg:block">
                <Quote/>
            </div>
        </div>
    </div>
    ) 
}
