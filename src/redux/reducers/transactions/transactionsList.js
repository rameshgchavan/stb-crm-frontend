import { LIST_TRANSACTIONS } from "../../constants/transactions"
// Initialize state
const initialState = {}

// Create and export Ruducers
export const transactionsListReducer = (state = initialState, action) => {
    // Destruct action
    const { type, data } = action;

    switch (type) {
        case LIST_TRANSACTIONS:
            return { ...state, data };

        default:
            return state
    }
}
