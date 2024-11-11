import { Quote } from "../components/Quote"
import {Auth} from "../components/Auth"

export const Signup = ()=>{
    return (
    <div>
        <div className="grid grid-cols-2">
            <div>
            <Auth type="signup"/>
            </div>
            {/* if you go above md breakpoint it would go invisible */}
            <div  className="invisible md:visible">
                <Quote/>
            </div>
        </div>
    </div>
    ) 
}