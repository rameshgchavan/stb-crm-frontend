import { Route } from 'react-router-dom';

import CustomerView from '../components/forms/customerForm';

const FromRoutes = (
    <Route>
        <Route path="/customer" element={<CustomerView />} />
        <Route path="/customer/:id" element={<CustomerView />} />
    </Route>
)

export default FromRoutes