import { Outlet, Route } from "react-router-dom"
import { authorityRoutes, userRoutes, adminRoutes } from "./filterRoutes";

// This function called by filterRoutes/index.js
// This function returns private filter routes
const privateRoutes = (admin) => {
    return (
        // Returning private routes according to user type
        <Route path="/private" element={<Outlet />}>
            {
                admin === "stb-crm" ? authorityRoutes
                    : admin === "self" ? adminRoutes
                        : userRoutes
            }
        </Route>
    )
}

export default privateRoutes;