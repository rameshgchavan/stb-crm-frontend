import { LIST_USERS } from "../../constants/users"
// Initialize state
const initialState = {}

// Create and export Ruducers
export const usersListReducer = (state = initialState, action) => {
    // Destruct action
    const { type, data } = action;

    switch (type) {
        case LIST_USERS:
            return { ...state, data };

        default:
            return state
    }
}
