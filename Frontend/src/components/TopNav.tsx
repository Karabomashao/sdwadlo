import { ChevronDown } from "lucide-react"
import { useState } from "react"

export default function TopNav(){

    const [isCollapsed, setIsCollapse] = useState(false);

    

    return(
        <>
        <header className="flex px-10 pt-5 justify-between border-b border-[#E7DED1] bg-[#F7F4ED]">
                {/* Greetings */}
                <div className="flex flex-col">
                    <span className="text-4xl">Hi, Admin</span>
                    <span className="text-[#77766F] font-sans">Style a brighter tomorrow</span> 
                </div>

                {/* Profile section */}
                <button className="">
                    <div className="flex flex-col">
                        <span>Admin</span>
                        <span>Administrator</span>
                    </div>
                    <span><ChevronDown/></span>
                </button>
        </header>
        </>
    )
}