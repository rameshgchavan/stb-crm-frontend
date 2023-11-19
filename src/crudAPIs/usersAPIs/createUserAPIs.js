import axios from "axios";

// Save a user
const createUser = async (userDetails) => {
    return (
        (await axios(`/users/signup`,
            {
                method: "post",
                data: userDetails
            }
        ))?.data
    );
};

export {
    createUser
}