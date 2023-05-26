import axios from "axios";
import { useSelector, useDispatch } from "react-redux"
import { listUsersAction } from "../redux/actions"

import UserCard from "../components/cards/UserCard"
import { useEffect } from "react";

const UsersPage = () => {
    const dispatch = useDispatch();
    const scrutiny = useSelector(state => state.scrutinyReducer);

    const { userStatus, userName } = useSelector(state => state.filterUsersReducer);
   
    const usersList = useSelector(state => state.usersReducer)
        ?.data?.filter((user, index) => user.Status == userStatus)
        .filter((user, index) => { return user.Name.toLowerCase().includes(userName.toLowerCase()) });

    useEffect(() => {
        listUsers();
    }, [])

    const listUsers = async () => {
        const users = await axios("/users", {
            method: "post",
            headers: { authorization: `bearer ${scrutiny.token}` },
            data: { Admin: true }
        });

        dispatch(listUsersAction(users.data));
    }

    const updateStatus = async (id, object) => {
        const users = await axios("/users/update", {
            method: "put",
            headers: { authorization: `bearer ${scrutiny.token}` },
            data: { id, object } // here object is key Name or Status 
        });

        if (users.data.code == 202) {
            listUsers();
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

            {usersList?.length == 0 ? <p>Nothing found {userStatus}</p> : ""}

        </div >
    )
}

export default UsersPage
