import { Outlet, Route } from 'react-router-dom';

// Pages
import HomePage from '../pages/HomePage';
import Signup from "../components/security/Signup";
import ForgotPassword from "../components/security/ForgotPassword";
import Login from '../components/security/Login';

// This routes used by pageRoutes/index.js
// Initialized public page routes and exported
const publicRoutes =
    <Route path="/" element={<Outlet />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgotpass" element={<ForgotPassword />} />
    </Route>

export default publicRoutes;