import { AUTHENTICATE_USER } from "../constants/scrutiny"

const authenticateUser = (data) => {
    return (
        {
            type: AUTHENTICATE_USER,
            data
        }
    )
}

export { authenticateUser }