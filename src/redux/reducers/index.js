import { combineReducers } from "redux";

import {
    scrutinyUserReducer,
    usersListReducer,
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

import {isLoadingReducer} from "./loading"

export const rootReducer = combineReducers({
    scrutinyUserReducer,
    usersListReducer,
    filterUsersReducer,

    customersListReducer,
    customersFilterationReducer,

    transactionsListReducer,
    transactionsSummaryReducer,
    summarizedTransactionsFilterationReducer,
    filteredTransactionsSliceReducer,

    isLoadingReducer
});