import {
    AUTHENTICATE_USER, LIST_USERS, SET_USER_STATUS, SEARCH_USER
} from "../constants/users"

const authenticateUserAction = (data) => {
    return (
        {
            type: AUTHENTICATE_USER,
            data
        }
    )
};

const listUsersAction = (data) => {
    return (
        {
            type: LIST_USERS,
            data
        }
    )
};

const setUserStatusAction = (data) => {
    return (
        {
            type: SET_USER_STATUS,
            data
        }
    )
};

const searchUserAction = (data) => {
    return (
        {
            type: SEARCH_USER,
            data
        }
    )
};

export {
    authenticateUserAction,
    listUsersAction,
    setUserStatusAction,
    searchUserAction
};