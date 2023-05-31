import { Route } from 'react-router-dom';

import CustomersPage from "../pages/CustomersPage";
import TransactionsPage from "../pages/TransactionsPage";
import UsersPage from '../pages/UsersPage';
import ExpiryPage from "../pages/ExpiryPage"

const PageRoutesAdmin = (
    <Route>
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/users" element={<UsersPage />} />
    </Route>
)

const PageRoutes = (
    <Route>
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/expiry" element={<ExpiryPage />} />
    </Route>
)

export { PageRoutesAdmin, PageRoutes } 