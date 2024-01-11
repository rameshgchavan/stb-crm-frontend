import { Routes } from 'react-router-dom';

import privateRoutes from './privateRoutes';

// This function called by src/App.js
// This function returns only private filter routes
const pageRoutes = (scrutinizedUser) => {
    return (
        <Routes >
            {/* Private Routes */}
            {scrutinizedUser.token && privateRoutes(scrutinizedUser.Admin)}
        </Routes>
    )
};

export default pageRoutes;