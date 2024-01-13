import axios from "axios";

// Get all users
const readUsersRequest = async (scrutinizedUser) => {
    return (
        (await axios(`/users`,
            {
                method: "post",
                headers: { authorization: `bearer ${scrutinizedUser.token}` },
                data: { user: scrutinizedUser }
            }
        ))?.data
    );
};

// Get a user
const readUserRequest = async (crediantials) => {
    return (
        (await axios(`/users/login`,
            {
                method: "post",
                data: crediantials
            }
        ))?.data
    );
};

// Check user's Email ID
const readUserEmailRequest = async (Email) => {
    return (
        (await axios(`/users/isemail`,
            {
                method: "post",
                data: Email
            }
        ))?.data
    );
};

export {
    readUsersRequest,
    readUserRequest,
    readUserEmailRequest
}