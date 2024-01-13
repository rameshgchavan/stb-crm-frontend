import { configureStore } from "@reduxjs/toolkit";

// reducers
import usersReducer from "../features/users/usersSlice";
import customersReducer from "../features/customers/customersSlice";
import transactionsReducer from "../features/transactions/transactionsSlice";
import loadingReducer from "../features/loadingSlice";

// store
export const store = configureStore({
    reducer:
    {
        usersReducer,
        customersReducer,
        transactionsReducer,
        loadingReducer
    }
});