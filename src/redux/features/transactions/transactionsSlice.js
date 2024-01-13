import { createSlice } from "@reduxjs/toolkit";

// initialized state
const initialState =
{
    transactions: [],
    filteredTransactions: [],
    firtCardIndex: 0
};

const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers:
    {
        // setting data intransactions array
        addTransactionsAction: (state, action) => {
            // overriding transactions and spreading payload array
            state.transactions = [...action.payload];
        },
        // setting data in filteredTransactions array and firstCardIndex 
        addFilteredTransactionsAction: (state, action) => {
            // overriding transactions and spreading payload array
            state.filteredTransactions = [...action.payload.filteredData];
            state.firtCardIndex = action.payload.firtCardIndex;
        },
    }
});

// exporting actions
export const {
    addTransactionsAction,
    addFilteredTransactionsAction
} = transactionsSlice.actions;
// exporting reducer
export default transactionsSlice.reducer;