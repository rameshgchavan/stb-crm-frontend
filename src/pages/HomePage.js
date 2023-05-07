import Login from "../components/login/Login"
// Import redux methods
import { useSelector } from "react-redux";

const HomePage = () => {
    const user = useSelector(reducers => reducers.usersReducer);

    return (
        <div>
            <Login />
            <p>{JSON.stringify(user.Name)}</p>
        </div>
    )
}

export default HomePage