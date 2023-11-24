import { Route } from 'react-router-dom';

import CustomersFilter from '../../components/filters/CustomersFilter';
import TransactionsFilter from '../../components/filters/TransactionsFilter';
import UsersFilter from '../../components/filters/UsersFilter';

// Initilalized and exported following routes
// These routes used by filterRoutes/index.js

const filterRoutesAuthority = <Route path="/users" element={<UsersFilter />} />;

const filterRoutesAdmin = <Route path="/users" element={<UsersFilter />} />;

const filterRoutesComman = (
    <Route>
        <Route path="/customers" element={<CustomersFilter />} />
        <Route path="/transactions" element={<TransactionsFilter />} />
    </Route>
);

export { filterRoutesAuthority, filterRoutesAdmin, filterRoutesComman } 