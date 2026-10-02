import { ChevronDown } from "lucide-react"
import { useState } from "react"

export default function TopNav(){

    const [isCollapsed, setIsCollapse] = useState(false);

    

    return(
        <>
        <header className="flex px-10 py-5 justify-between border-b border-[#E7DED1] bg-[#F7F4ED]">
                {/* Greetings */}
                <div className="flex flex-col">
                    <span className="text-xl">Hi, Admin</span>
                    <span className="text-[#77766F] font-sans text-sm">Style a brighter tomorrow</span> 
                </div>

                {/* Profile section */}
                <button className="flex">
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