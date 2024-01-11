import { Route } from 'react-router-dom';

// Pages 
import CustomersPage from "../../pages/CustomersPage";
import TransactionsPage from "../../pages/TransactionsPage";
import UsersPage from '../../pages/UsersPage';
import StatisticsPage from '../../pages/StatisticsPage';
import SettingPage from '../../pages/SettingPage';
import PlansPage from '../../pages/PlansPage';


// Initilalized and exported following page routes
// These routes used by pageRoutes/privateRoutes.js

const authorityRoutes = <Route path="users" element={<UsersPage />} />;

const userRoutes =
    <Route>
        <Route path="customers" element={<CustomersPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
    </Route>

const adminRoutes =
    <Route>
        {authorityRoutes}
        {userRoutes}
        <Route path="statistics" element={<StatisticsPage />} />
        <Route path="plans" element={<PlansPage />} />
        <Route path="setting" element={<SettingPage />} />
    </Route>

export { authorityRoutes, userRoutes, adminRoutes } 