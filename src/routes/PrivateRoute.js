import { Outlet, Navigate } from "react-router-dom"

// This function called by filterRoutes/index.js and pageRoutes/index.js
const privateRoute = (scrutinizedUser) => {
    return (
        // If user logged successfully then let pass routes through oulet else navigate to login route
        scrutinizedUser.token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default privateRoute