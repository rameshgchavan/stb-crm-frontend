import { Route } from 'react-router-dom';

import TrasactionsPrint from '../components/prints/TrasactionsPrint';

const PrintRoutes = (
    <Route>
        <Route path="/transactions/preview" element={<TrasactionsPrint />} />
    </Route>
)

export default PrintRoutes