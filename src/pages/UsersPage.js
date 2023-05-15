import axios from "axios";
import { useSelector, useDispatch } from "react-redux"
import { listUsersAction } from "../redux/actions"

import UserCard from "../components/users/UserCard"
import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

const UsersPage = () => {
    const dispatch = useDispatch();
    const scrutiny = useSelector(state => state.scrutinyReducer);
    const usersList = useSelector(state => state.usersReducer);
    const [status, setStatus] = useState("pending");

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

    return (
        <div>
            <ButtonGroup className="mb-3">
                <Button variant="warning" onClick={() => { setStatus("pending") }}>Pending</Button>
                <Button variant="success" onClick={() => { setStatus("approved") }}>Approved</Button>
                <Button variant="danger" onClick={() => { setStatus("blocked") }}>Blocked</Button>
            </ButtonGroup>

            {
                usersList.data?.map((user, index) => {
                    if (user.Status == status) {
                        return (
                            <div key={index} className="mb-3">
                                <UserCard userInfo={{ user, status }} />
                            </div>
                        )
                    }
                })
            }
            <hr />
        </div>
    )
}

export default UsersPage
