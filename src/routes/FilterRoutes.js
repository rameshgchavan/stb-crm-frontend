import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CustomersFilter from '../components/filters/CustomersFilter';
import TransactionsFilter from '../components/filters/TransactionsFilter';
import UsersFilter from '../components/filters/UsersFilter';

const FilterRoutes = () => {
    const scrutinizedUser = useSelector(state => state.scrutinyUserReducer);
    JSON.stringify(scrutinizedUser);

    return (
        <Routes >
            {
                scrutinizedUser.Admin &&
                <Route>
                    <Route path="/users" element={<UsersFilter />} />
                </Route>
            }

            <Route>
                <Route path="/customers" element={<CustomersFilter />} />
                <Route path="/transactions" element={<TransactionsFilter />} />
            </Route>
        </Routes>
    )
}

export default FilterRoutes