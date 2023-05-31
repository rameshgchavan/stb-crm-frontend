import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const user = useSelector(state => state.scrutinyReducer);
    JSON.stringify(user);
    return (
        <div>
            {user.token ? <Outlet /> : <Navigate to="/login" />}
        </div>
    )
}

export default PrivateRoute