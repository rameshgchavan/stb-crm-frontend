import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CustomersFilter from '../components/filters/CustomersFilter';
import ExpiryFilter from '../components/filters/ExpiryFilter';
import TransactionsFilter from '../components/filters/TransactionsFilter';
import UsersFilter from '../components/filters/UsersFilter';

const FilterRoutes = () => {
    const user = useSelector(state => state.scrutinyReducer);
    JSON.stringify(user);

    return (
        <Routes >
            {
                user.Admin &&
                <Route>
                    <Route path="/transactions" element={<TransactionsFilter />} />
                    <Route path="/users" element={<UsersFilter />} />
                </Route>
            }
          
            <Route>
                <Route path="/customers" element={<CustomersFilter />} />
                <Route path="/expiry" element={<ExpiryFilter />} />
            </Route>
        </Routes>
    )
}

export default FilterRoutes