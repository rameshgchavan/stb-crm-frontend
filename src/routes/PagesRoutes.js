import { Outlet, Route, Routes } from 'react-router-dom'

import HomePage from "../pages/HomePage";
import CustomersPage from "../pages/CustomersPage";
import TransactionsPage from "../pages/TransactionsPage";
import PageNotFound from "../pages/PageNotFound";

const PagesRoutes = () => {
    return (
        <div className='mt-4'>
            <Routes >
                <Route path="/" element={<Outlet />}>
                    <Route index element={<HomePage />} />
                    <Route path="/customers" element={<CustomersPage />} />
                    <Route path="/transactions" element={<TransactionsPage />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </div>
    )
}

export default PagesRoutes