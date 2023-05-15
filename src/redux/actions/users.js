import { AUTHENTICATE_USER, LIST_USERS } from "../constants/users"

const authenticateUserAction = (data) => {
    return (
        {
            type: AUTHENTICATE_USER,
            data
        }
    )
}

const listUsersAction = (data) => {
    return (
        {
            type: LIST_USERS,
            data
        }
    )
}

export { authenticateUserAction, listUsersAction }