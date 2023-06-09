import { Route } from 'react-router-dom';

import CustomerForm from '../components/forms/customerForm';
import PackageForm from '../components/forms/packageForm';

const FromRoutes = (
    <Route>
        <Route path="/customer" element={<CustomerForm />} />
        <Route path="/customer/:id" element={<CustomerForm />} />
        <Route path="/package/:acNo/:transactionDate" element={<PackageForm />} />
    </Route>
)

export default FromRoutes