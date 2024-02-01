import { createSlice } from "@reduxjs/toolkit";

// initialized state
const initialState =
{
    transactions: [],
    filteredTransactions: [],
    filteredSlicedTransactions: { slicedData: [], firstCardIndex: 0 },
};

const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers:
    {
        // setting data in transactions array
        addTransactionsAction: (state, action) => {
            // overriding transactions and spreading payload array
            state.transactions = [...action.payload];
        },

        // setting data in filteredTransactions array
        addFilteredTransactionsAction: (state, action) => {
            state.filteredTransactions = [...action.payload]
        },

        // setting data in filteredSlicedTransactions array and firstCardIndex 
        addFilteredSlicedTransactionsAction: (state, action) => {
            // overriding transactions and spreading payload array
            state.filteredSlicedTransactions = action.payload;
        },
    }
});

// exporting actions
export const {
    addTransactionsAction,
    addFilteredTransactionsAction,
    addFilteredSlicedTransactionsAction
} = transactionsSlice.actions;
// exporting reducer
export default transactionsSlice.reducer;