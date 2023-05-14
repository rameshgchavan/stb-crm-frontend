import { Outlet, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import HomePage from "../pages/HomePage";
import CustomersPage from "../pages/CustomersPage";
import TransactionsPage from "../pages/TransactionsPage";
import PageNotFound from "../pages/PageNotFound";
import UsersPage from '../pages/UsersPage';

import Login from '../components/security/Login';
import Signup from "../components/security/Signup";
import ForgotPassword from "../components/security/ForgotPassword";

const PagesRoutes = () => {
    const user = useSelector(state => state.scrutinyReducer);
    JSON.stringify(user);

    return (
        <div className='mt-4'>
            <Routes >
                <Route path="/" element={<Outlet />}>
                    <Route index element={<HomePage ><Login /> </HomePage>} />
                    {
                        user.Admin
                            ? <Route>
                                <Route path="/customers" element={<CustomersPage />} />
                                <Route path="/transactions" element={<TransactionsPage />} />
                                <Route path="/users" element={<UsersPage />} />
                            </Route>
                            : user.Name
                                ?
                                <Route>
                                    <Route path="/customers" element={<CustomersPage />} />
                                </Route>
                                : <Route element={<HomePage />} />
                    }

                    <Route path="/signup" element={<HomePage ><Signup /> </HomePage>} />
                    <Route path="/forgotpass" element={<HomePage ><ForgotPassword /> </HomePage>} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </div >
    )
}

export default PagesRoutes