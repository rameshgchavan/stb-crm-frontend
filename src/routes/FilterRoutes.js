import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CustomerFilter from '../components/filters/CustomerFilter';
import ExpiryFilter from '../components/filters/ExpiryFilter';
import UserFilter from '../components/filters/UserFilter';

const FilterRoutes = () => {
    const user = useSelector(state => state.scrutinyReducer);
    JSON.stringify(user);

    return (
        <Routes >
            {
                user.Admin
                    ? <Route>
                        <Route path="/customers" element={<CustomerFilter />} />
                        <Route path="/expiry" element={<ExpiryFilter />} />
                        <Route path="/users" element={<UserFilter />} />
                    </Route>
                    : user.Name
                        ?
                        <Route>
                            <Route path="/customers" element={<CustomerFilter />} />
                            <Route path="/expiry" element={<ExpiryFilter />} />
                        </Route>
                        : ""
            }
        </Routes>
    )
}

export default FilterRoutes