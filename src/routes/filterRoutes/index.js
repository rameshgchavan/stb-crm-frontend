import { Route, Routes } from 'react-router-dom';

import privateRoute from '../privateRoute';
import { filterRoutesAuthority, filterRoutesAdmin, filterRoutesComman } from './filterRoutes';

// This function called by src/App.js
// This function combines routes
const filterRoutes = (scrutinizedUser) => {
    return (
        <Routes >
            {/* Private Routes */}
            <Route path="/" element={privateRoute(scrutinizedUser)}>
                {/* Admin Routes (Only Admin can access) */}
                {scrutinizedUser.Admin === "self" && filterRoutesAdmin}

                {/* If user stb-crm then routes user filer only else routes comman filter */}
                {scrutinizedUser.Admin === "stb-crm" ? filterRoutesAuthority : filterRoutesComman}
            </Route>
        </Routes>
    )
}

export default filterRoutes;