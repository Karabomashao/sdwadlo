import { Navigate, Outlet } from "react-router-dom";

export default function AdminProtectedRoute(){


    if (!localStorage.getItem("token")){
        console.log("No toekn");
        return <Navigate to='/login' replace/>
    }

    return <Outlet/>;
}