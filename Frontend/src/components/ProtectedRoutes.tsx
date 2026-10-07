import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { superbase } from "../lib/supabase";
import type { User } from "@supabase/supabase-js";
import Unauthorized from "./Unauthorized";


type ProptectedRoutes = {
    allowedRoles: string[]
};

export default function ProtectedRoutes({allowedRoles}: ProptectedRoutes){

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    //get user from superbase
    useEffect(() => {
        async function getUser(){
            const {data, error} = await superbase.auth.getUser();
            if (error || !data.user){
                setUser(null);
                setLoading(false);
                return
            }else{
                setUser(data.user);
                setLoading(false);
            }
        }
        getUser();
    }, [])

    if (loading){
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-[#5F6248]" />
            </div>
        );  
    }

    if (!user){
        return <Navigate to="/login" replace />;
    }

    return (
        allowedRoles.includes(user.user_metadata.role)
        ? <Outlet/>
        : <Unauthorized/>
    )
    
}