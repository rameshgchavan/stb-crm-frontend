import { LIST_CUSTOMERS } from "../../constants/customers"
// Initialize state
const initialState = {}

// Create and export Ruducers
export const customersReducer = (state = initialState, action) => {
    // Destruct action
    const { type, data } = action;

    switch (type) {
        case LIST_CUSTOMERS:
            return { ...state, data };

        default:
            return state
    }
}
