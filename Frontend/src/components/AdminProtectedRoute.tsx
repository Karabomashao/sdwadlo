import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { superbase } from "../lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function AdminProtectedRoute(){

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getUser(){
            const {data, error} = await superbase.auth.getUser();
            if (error || !data.user){
                setUser(null);
                setLoading(false);
                return
            }else{
                console.log(user);
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

    return <Outlet/>;
}