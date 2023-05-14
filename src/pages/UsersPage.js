import { useSelector } from "react-redux"

import UserCard from "../components/users/UserCard"

const UsersPage = () => {
    const users = useSelector(state => state.usersReducer);

    // JSON.stringify(users);

    console.warn(users);

    return (
        <div>
            <UserCard />
        </div>
    )
}

export default UsersPage
