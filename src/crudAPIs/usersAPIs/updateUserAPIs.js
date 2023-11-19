import axios from "axios";

// Update a user
const updateUser = async (scrutinizedUser, id, object) => {
    return (
        (await axios(`/users/update`,
            {
                method: "put",
                headers: { authorization: `bearer ${scrutinizedUser.token}` },
                data: { id, object } // here object is key Name or Status 
            }
        ))?.data
    );
};

// Reset password
const updateUserPassword = async (userCredentails) => {
    return (
        (await axios(`/users/resetpass`,
            {
                method: "put",
                data: userCredentails
            }
        ))?.data
    );
};

export {
    updateUser,
    updateUserPassword
}