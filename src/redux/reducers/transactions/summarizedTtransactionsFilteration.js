import { FILTER_SUMMARIZED_TRANSACTIONS } from "../../constants/transactions"
// Initialize state
const initialState = {}

// Create and export Ruducers
export const summarizedTransactionsFilterationReducer = (state = initialState, action) => {
    // Destruct action
    const { type, data } = action;

    switch (type) {
        case FILTER_SUMMARIZED_TRANSACTIONS:
            return { data };

        default:
            return state
    }
}
