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


                  {/* TOP HEADER
          <div className="border-b border-[#E7E0D6] px-6 py-5 lg:px-8">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="font-serif text-5xl leading-none text-[#252521]">
                  Good Morning, Admin
                </h2>
                <p className="mt-2 text-lg text-[#6D6A62]">
                  Style a brighter tomorrow.
                </p>
              </div>

              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                <div className="flex h-14 w-full items-center gap-3 rounded-xl border border-[#ECE6DD] bg-[#FCFAF6] px-4 lg:w-[420px]">
                  <Search size={18} className="text-[#8A857B]" />
                  <input
                    type="text"
                    placeholder="Search products, orders, customers..."
                    className="w-full bg-transparent text-sm outline-none placeholder:text-[#A7A298]"
                  />
                </div>

                <div className="flex items-center gap-5">
                  <button className="relative text-[#252521]">
                    <Bell size={22} />
                    <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
                  </button>

                  <div className="flex items-center gap-3 border-l border-[#DDD6CC] pl-5">
                    <img
                      src="/images/admin-avatar.jpg"
                      alt="Admin"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-[#252521]">Admin</p>
                      <p className="text-sm text-[#77766F]">Administrator</p>
                    </div>
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </>
    )
}