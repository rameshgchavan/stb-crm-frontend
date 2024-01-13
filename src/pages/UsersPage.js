import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"

import UserCard from "../components/cards/UserCard"
import { readUsersRequest, updateUserRequest } from "../apiRequests/usersAPIs";
import { addUsersAction } from "../redux/features/users/usersSlice";


// This page used by routes/PagesRoutes
// This page shows User cards
const UsersPage = () => {
    const { scrutinizedUser, users, userStatus } = useSelector(state => state.usersReducer);

    const usersList = users.filter(user =>
        user.Admin != "stb-crm" &&
        user.Status == userStatus
        // user.Admin == (scrutinizedUser.Email).replace(".", "-") &&
    )

    // Create object of useDispatch method
    const dispatch = useDispatch();

    const updateStatus = async (id, object) => {
        // Update a user
        const response = await updateUserRequest(scrutinizedUser, id, object);

        if (response.code == 202) {
            // Get users and update users rudux
            dispatch(addUsersAction(await readUsersRequest(scrutinizedUser)))
        }
    }

    return (
        <div>
            {
                usersList?.map((user, index) => {
                    return (
                        <div key={user._id} className="mb-3">
                            <UserCard userInfo={{ user, userStatus, updateStatus }} />
                        </div>
                    )
                })

            }

            {usersList?.length == 0 ? <p>Nothing found {"userStatus"}</p> : ""}

        </div >
    )
}

export default UsersPage
