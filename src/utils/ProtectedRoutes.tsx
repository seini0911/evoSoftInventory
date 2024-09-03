import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoutes = ()=>{
    const{ user} = useContext(AuthContext)??{};
    console.log("user authenticated  : ", user);
    return user ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoutes;