import { Route } from 'react-router-dom';

import Signup from "../components/security/Signup";
import ForgotPassword from "../components/security/ForgotPassword";
import Login from '../components/security/Login';
import PageNotFound from "../pages/PageNotFound";

const PublicRoutes = (
    <Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpass" element={<ForgotPassword />} />
        <Route path="*" element={<PageNotFound />} />
    </Route>
)

export default PublicRoutes