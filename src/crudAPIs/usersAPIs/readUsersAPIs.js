import axios from "axios";

// Get all users
const readUsers = async (scrutinizedUser) => {
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
const readUser = async (crediantials) => {
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
const readUserEmail = async (Email) => {
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
    readUsers,
    readUser,
    readUserEmail
}