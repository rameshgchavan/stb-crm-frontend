import { SUMMARIZE_TRANSACTIONS } from "../../constants/transactions"
// Initialize state
const initialState = {}

// Create and export Ruducers
export const transactionsSummaryReducer = (state = initialState, action) => {
    // Destruct action
    const { type, data } = action;

    switch (type) {
        case SUMMARIZE_TRANSACTIONS:
            return { ...state, data };

        default:
            return state
    }
}
