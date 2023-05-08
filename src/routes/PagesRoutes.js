import { Outlet, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import HomePage from "../pages/HomePage";
import CustomersPage from "../pages/CustomersPage";
import TransactionsPage from "../pages/TransactionsPage";
import SignupPage from "../pages/SignupPage";
import PageNotFound from "../pages/PageNotFound";


const PagesRoutes = () => {
    const user = useSelector(state => state.usersReducer);
    JSON.stringify(user);

    return (
        <div className='mt-4'>
            <Routes >
                <Route path="/" element={<Outlet />}>
                    <Route index element={<HomePage />} />
                    {
                        user.Admin
                            ? <Route>
                                <Route path="/customers" element={<CustomersPage />} />
                                <Route path="/transactions" element={<TransactionsPage />} />
                            </Route>
                            : user.Name
                                ?
                                <Route>
                                    <Route path="/customers" element={<CustomersPage />} />
                                </Route>
                                : <Route element={<HomePage />} />
                    }

                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </div >
    )
}

export default PagesRoutes