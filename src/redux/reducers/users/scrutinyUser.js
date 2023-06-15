// Import constants
import { AUTHENTICATE_USER } from "../../constants/users";

// Initialize state
const initialState = {};

// Create and export Ruducers
export const scrutinyUserReducer = (state = initialState, action) => {
    // Destruct action
    const { type, data } = action;

    switch (type) {
        case AUTHENTICATE_USER:
            return data;

        default:
            return state
    }
}