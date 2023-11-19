import { useDispatch, useSelector } from "react-redux"

import UserCard from "../components/cards/UserCard"
import { readUsers, updateUser } from "../crudAPIs/usersAPIs";
import { listUsersAction } from "../redux/actions";

const UsersPage = () => {
    const scrutinizedUser = useSelector(state => state.scrutinyUserReducer);
    const { userStatus, userName } = useSelector(state => state.filterUsersReducer);

    const usersList = useSelector(state => state.usersListReducer)
        ?.data?.filter((user, index) => user.Status == userStatus)
        .filter((user, index) => { return user.Name.toLowerCase().includes(userName.toLowerCase()) });

    // Create object of useDispatch method
    const dispatch = useDispatch();

    const updateStatus = async (id, object) => {
        // Update a user
        const response = await updateUser(scrutinizedUser, id, object);

        if (response.code == 202) {
            // Get users and update users rudux
            dispatch(listUsersAction(await readUsers(scrutinizedUser)))
        }
    }

    return (
        <div>
            {
                usersList?.filter(user => user.Admin !== "stb-crm")
                    .map((user, index) => {
                        return (
                            <div key={user._id} className="mb-3">
                                <UserCard userInfo={{ user, userStatus, updateStatus }} />
                            </div>
                        )
                    })

            }

            {usersList?.length == 0 ? <p>Nothing found {userStatus}</p> : ""}

        </div >
    )
}

export default UsersPage
