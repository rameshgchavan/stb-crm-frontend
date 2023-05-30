import { FILTER_CUSTOMERS } from "../../constants/customers"
// Initialize state
const initialState = {}

// Create and export Ruducers
export const customersFilterationReducer = (state = initialState, action) => {
    // Destruct action
    const { type, data, firtCardIndex } = action;

    switch (type) {
        case FILTER_CUSTOMERS:
            return { data, firtCardIndex };

        default:
            return state
    }
}
