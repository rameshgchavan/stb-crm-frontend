import { Route } from 'react-router-dom';

import CustomersPage from "../../pages/CustomersPage";
import TransactionsPage from "../../pages/TransactionsPage";
import UsersPage from '../../pages/UsersPage';
import StatisticsPage from '../../pages/StatisticsPage';
import SettingPage from '../../pages/SettingPage';
import PlansPage from '../../pages/PlansPage';


// Initilalized and exported following routes
// These routes used by pageRoutes/index.js

const pageRoutesAuthority = <Route path="/users" element={<UsersPage />} />;

const pageRoutesAdmin = (
    <Route>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/setting" element={<SettingPage />} />
    </Route>
);

const pageRoutesComman = (
    <Route>
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
    </Route>
);

export { pageRoutesAuthority, pageRoutesAdmin, pageRoutesComman } 