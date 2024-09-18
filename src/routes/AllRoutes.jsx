import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { HomeRecep } from "../pages/HomeRecep";
import { Unauthorized } from "../pages/Unauthorized";
import RoutesProtected from "./RoutesProtected";

const AllRoutes = () => {

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                <Route path="/Home" element={
                    <RoutesProtected allowedRoles={["ADMIN", "COMPANY_EMISOR"]}>
                        <Home />
                    </RoutesProtected>
                }/>

                <Route path="/Homerecep" element={
                    <RoutesProtected allowedRoles={["ORGANIZATION_RECEPTOR"]}>
                        <HomeRecep />
                    </RoutesProtected>
                }/>
            </Routes>
        </BrowserRouter>
    )
}

export default AllRoutes;