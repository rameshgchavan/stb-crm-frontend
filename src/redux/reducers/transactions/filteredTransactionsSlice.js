import { SLICE_FILTERED_TRANSACTIONS } from "../../constants/transactions"
// Initialize state
const initialState = {}

// Create and export Ruducers
export const filteredTransactionsSliceReducer = (state = initialState, action) => {
    // Destruct action
    const { type, data, firtCardIndex } = action;

    switch (type) {
        case SLICE_FILTERED_TRANSACTIONS:
            return { data, firtCardIndex };

        default:
            return state
    }
}
