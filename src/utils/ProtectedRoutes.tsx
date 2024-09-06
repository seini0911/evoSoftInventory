import { useContext } from "react";
import { Navigate} from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Dashboard from "../pages/dashboard/Dashboard";

const ProtectedRoutes = ()=>{
    const{ user} = useContext(AuthContext)??{};
    return user ? <Dashboard /> : <Navigate to="/login" replace />
}

export default ProtectedRoutes;