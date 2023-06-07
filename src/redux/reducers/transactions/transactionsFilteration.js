import { FILTER_TRANSACTIONS } from "../../constants/transactions"
// Initialize state
const initialState = {}

// Create and export Ruducers
export const transactionsFilterationReducer = (state = initialState, action) => {
    // Destruct action
    const { type, data, firtCardIndex } = action;

    switch (type) {
        case FILTER_TRANSACTIONS:
            return { data, firtCardIndex };

        default:
            return state
    }
}
