import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.jsx";

const PrivateRoute = () => {
    const { currentUser } = useAuth();

    return currentUser ? <Outlet /> : <Navigate to="/login" replace/>;
};

export default PrivateRoute;