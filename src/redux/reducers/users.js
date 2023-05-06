//Import axioxs
import axios from "axios";

// Import constants
import { AUTHENTICATE_USER } from "../constants/users";

// Initialize state
const initialState = [];

// Create and export Ruducers
export const usersReducer = (state = initialState, action) => {
    // Destruct action
    const { type, data } = action;

    switch (type) {
        case AUTHENTICATE_USER:
            const user = axios("/users/login", {
                method: "post",
                data
            }).then(res => res).catch(err => err);

            console.warn(user)

            // return user;

        default: return state
    }
}
