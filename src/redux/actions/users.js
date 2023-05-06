import AUTHENTICATE_USER from "../constants/users";

const authenticateUser = (data) => {
    return (
        {
            type: AUTHENTICATE_USER,
            data
        }
    )
}

export { authenticateUser }