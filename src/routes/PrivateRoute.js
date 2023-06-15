import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const scrutinizedUser = useSelector(state => state.scrutinyUserReducer);
    JSON.stringify(scrutinizedUser);
    return (
        <div>
            {scrutinizedUser.token ? <Outlet /> : <Navigate to="/login" />}
        </div>
    )
}

export default PrivateRoute