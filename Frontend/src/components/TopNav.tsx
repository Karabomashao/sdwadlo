import { ChevronDown } from "lucide-react"
import React, { useState } from "react"
import { superbase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
export default function TopNav(){

    const [isCollapsed, setIsCollapse] = useState(false);

    
    const navigate = useNavigate();
    async function superbaseLogout(){
        const { error } = await superbase.auth.signOut({scope: 'local'});
        if (error){
            console.log(error);
        }
    }

    async function handleLogout(){
        await superbaseLogout();
        navigate("/login");
    }

    return(
        <>
        <header className="flex px-10 py-5 justify-between border-b border-[#E7DED1] bg-[#F7F4ED]">
                {/* Greetings */}
                <div className="flex flex-col">
                    <span className="text-xl">Hi, Admin</span>
                    <span className="text-[#77766F] font-sans text-sm">Style a brighter tomorrow</span> 
                </div>

                {/* Profile section */}
                <button className="flex" onClick={handleLogout}>
                    <div className="flex flex-col">
                        <span>Logout</span>
                    </div>
                </button>
        </header>
        </>
    )
}