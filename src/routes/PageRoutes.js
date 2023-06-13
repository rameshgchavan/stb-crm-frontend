import { Route } from 'react-router-dom';

import CustomersPage from "../pages/CustomersPage";
import TransactionsPage from "../pages/TransactionsPage";
import UsersPage from '../pages/UsersPage';

const PageRoutesAdmin = (
    <Route>
        <Route path="/users" element={<UsersPage />} />
    </Route>
)

const PageRoutes = (
    <Route>
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
    </Route>
)

export { PageRoutesAdmin, PageRoutes } 