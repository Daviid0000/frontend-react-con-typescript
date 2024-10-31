import { Navigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ContextAuthRoutes } from "../context/contextAuthRoutes";
import { getRolToken } from "../utils/getRolToken.js";

const RoutesProtected = ({children, allowedRoles}) => {
    const location = useLocation();
    const { state, dispatch } = useContext(ContextAuthRoutes);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        if(token) {
            dispatch({ type: "LOGIN"});
        }

        setIsLoading(false);
    }, [dispatch])

    if(isLoading){
        return <div>Loading...</div>
    }

    if(!state.isLogged) {
        return <Navigate to="/" state={{ from: location }} />
    }

    const rolToken = getRolToken();
    if(!allowedRoles.includes(rolToken)) {
        return <Navigate to="/unauthorized" />
    }

    return children 
}

export default RoutesProtected