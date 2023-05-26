import { SET_USER_STATUS, SEARCH_USER } from "../../constants/users"
// Initialize state
const initialState = { userStatus: "approved", userName: "" }

// Create and export Ruducers
export const filterUsersReducer = (state = initialState, action) => {
    // Destruct action
    const { type, data } = action;

    switch (type) {
        case SET_USER_STATUS:
            return {
                userStatus: data, userName: state.userName
            };

        case SEARCH_USER:
            return {
                userStatus: state.userStatus, userName: data
            };
        default:
            return state
    }
}
