import { Route, Routes } from 'react-router-dom';

import privateRoute from '../privateRoute';
import publicRoutes from '../publicRoutes';
import { pageRoutesAuthority, pageRoutesAdmin, pageRoutesComman } from './pageRoutes';

// This function called by src/App.js
// This function combines routes
const pageRoutes = (scrutinizedUser) => {
    return (
        <Routes >
            {/* Private Routes */}
            <Route path="/" element={privateRoute(scrutinizedUser)}>
                {/* Admin Routes (Only Admin can access) */}
                {scrutinizedUser.Admin === "self" && pageRoutesAdmin}

                {/* Comman Routes (Only Admin and User can access ) */}
                {scrutinizedUser.Admin === "stb-crm" ? pageRoutesAuthority : pageRoutesComman}
            </Route>

            {/* Public Routes */}
            {publicRoutes}
        </Routes>
    )
};

export default pageRoutes;