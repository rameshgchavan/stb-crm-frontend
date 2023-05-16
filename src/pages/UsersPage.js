import axios from "axios";
import { useSelector, useDispatch } from "react-redux"
import { listUsersAction } from "../redux/actions"

import UserCard from "../components/users/UserCard"
import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

const UsersPage = () => {
    const [status, setStatus] = useState("pending");

    const dispatch = useDispatch();
    const scrutiny = useSelector(state => state.scrutinyReducer);

    const usersList = useSelector(state => state.usersReducer)
        ?.data?.filter((user, index0) => user.Status == status);

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
            data: { id, object }
        });

        if (users.data.code == 202) {
            listUsers();
        }
    }

    return (
        <div>
            <ButtonGroup className="mb-3">
                <Button variant="warning" onClick={() => { setStatus("pending") }}>Pending</Button>
                <Button variant="success" onClick={() => { setStatus("approved") }}>Approved</Button>
                <Button variant="danger" onClick={() => { setStatus("blocked") }}>Blocked</Button>
            </ButtonGroup>

            {
                usersList?.map((user, index) => {
                    return (
                        <div key={user._id} className="mb-3">
                            <UserCard userInfo={{ user, status, updateStatus }} />
                        </div>
                    )
                })

            }

            {usersList.length == 0 ? <p>Nothing found {status}</p> : ""}

        </div >
    )
}

export default UsersPage
