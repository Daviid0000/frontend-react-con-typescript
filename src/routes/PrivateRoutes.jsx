import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { useContext } from "react";
import { ContextAuthRoutes } from "../context/contextAuthRoutes";

const PrivateRoutes = () => {
    return(
        <>
            <Routes>
                <Route index element={<Login />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </>
    )
}

const PublicRoutes = () => {
    return(
        <>
            <Routes>
                <Route index element={<Login />} />
            </Routes>
        </>
    )
}

export const Routers = () => {
    const { state } = useContext(ContextAuthRoutes);
    
    return(
        <BrowserRouter>
            { // Si el usuario está logueado tendrá acceso a las rutas privadas, sino, a las rutas públicas.
                state.isLogged ? ( <PrivateRoutes /> ) : ( <PublicRoutes /> )
            }
        </BrowserRouter>
    )
}

export default PrivateRoutes