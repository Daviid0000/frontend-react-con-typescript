import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Home } from "../pages/Home";
import { HomeRecep } from "../pages/HomeRecep";
import { Unauthorized } from "../pages/Unauthorized";
import { NotFound } from "../pages/NotFound";
import RoutesProtected from "./RoutesProtected";
import { rols } from "../types/types";

const AllRoutes = () => {

    return(
        <BrowserRouter>
            <Routes>
                <Route index element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/*" element={<NotFound />} />

                <Route path="/Home" element={
                    <RoutesProtected allowedRoles={[rols.ADMIN, rols.COMPANY_EMISOR]}>
                        <Home />
                    </RoutesProtected>
                }/>

                <Route path="/Homerecep" element={
                    <RoutesProtected allowedRoles={[rols.ORGANIZATION_RECEPTOR]}>
                        <HomeRecep />
                    </RoutesProtected>
                }/>
            </Routes>
        </BrowserRouter>
    )
}

export default AllRoutes;