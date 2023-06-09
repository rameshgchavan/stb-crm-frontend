import { combineReducers } from "redux";

import {
    scrutinyReducer,
    usersReducer,
    filterUsersReducer
} from "./users";

import {
    customersListReducer,
    customersFilterationReducer
} from "./customers";

import {
    transactionsListReducer,
    transactionsSummaryReducer,
    summarizedTransactionsFilterationReducer,
    filteredTransactionsSliceReducer
} from "./transactions";

export const rootReducer = combineReducers({
    scrutinyReducer,
    usersReducer,
    filterUsersReducer,

    customersListReducer,
    customersFilterationReducer,

    transactionsListReducer,
    transactionsSummaryReducer,
    summarizedTransactionsFilterationReducer,
    filteredTransactionsSliceReducer
});