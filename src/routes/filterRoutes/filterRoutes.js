import { Route } from 'react-router-dom';

// Pages 
import CustomersFilter from '../../components/filters/CustomersFilter';
import TransactionsFilter from '../../components/filters/TransactionsFilter';
import UsersFilter from '../../components/filters/UsersFilter';

// Initilalized and exported following routes
// These routes used by filterRoutes/privateRoutes.js

const authorityRoutes = <Route path="users" element={<UsersFilter />} />;

const userRoutes =
    <Route>
        <Route path="customers" element={<CustomersFilter />} />
        <Route path="transactions" element={<TransactionsFilter />} />
    </Route>

const adminRoutes = <Route>
    {authorityRoutes}
    {userRoutes}
</Route>


export { authorityRoutes, userRoutes, adminRoutes } 