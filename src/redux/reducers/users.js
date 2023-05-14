
// Initialize state
const initialState ={}

// Create and export Ruducers
export const usersReducer = (state = initialState, action) => {
    // Destruct action
    const { type, data } = action;

    switch (type) {
        // case AUTHENTICATE_USER:
        //     return data;

        default:
            return state
    }
}
