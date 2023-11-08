import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PrivateRoute from './PrivateRoute';
import PublicRoutes from './PublicRoutes';
import { PageRoutesAdmin, PageRoutes } from './PageRoutes';

const AllRoutes = () => {
    const scrutinizedUser = useSelector(state => state.scrutinyUserReducer);
    JSON.stringify(scrutinizedUser);

    return (
        <div className='mt-3'>
            <Routes >
                {/* Private Routes */}
                <Route path="/" element={<PrivateRoute />}>
                    {/* Admin Routes (Only Admin can access) */}
                    {scrutinizedUser.Admin &&
                        <Route>
                            {PageRoutesAdmin}
                        </Route>
                    }

                    {/* Comman Routes (Admin and User both can access) */}
                    <Route>
                        {PageRoutes}
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