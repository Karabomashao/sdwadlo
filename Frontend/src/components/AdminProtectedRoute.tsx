import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { superbase } from "../lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function AdminProtectedRoute(){

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function getUser(){
            const {data, error} = await superbase.auth.getUser();
            if (error || !data.user){
                setUser(null);
            }else{
                console.log(user);
                setUser(data.user);
            }
        }
        getUser();
    }, [])

    if (!user){
        return <Navigate to="/login" replace />;
    }

    return <Outlet/>;
}