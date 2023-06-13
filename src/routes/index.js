import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PrivateRoute from './PrivateRoute';
import PublicRoutes from './PublicRoutes';
import { PageRoutesAdmin, PageRoutes } from './PageRoutes';
import FromRoutes from './FormRoutes';

const AllRoutes = () => {
    const user = useSelector(state => state.scrutinyReducer);
    JSON.stringify(user);

    return (
        <div className='mt-3'>
            <Routes >
                {/* Private Routes */}
                <Route path="/" element={<PrivateRoute />}>
                    {/* Admin Routes (Only Admin can access) */}
                    {user.Admin &&
                        <Route>
                            {PageRoutesAdmin}
                        </Route>
                    }

                    {/* Comman Routes (Admin and User both can access) */}
                    <Route>
                        {PageRoutes}
                        {FromRoutes}
                    </Route>
                </Route>

                {/* Public Routes */}
                <Route>
                    {PublicRoutes}
                </Route>
            </Routes>
        </div >
    )
}

export default AllRoutes