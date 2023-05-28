import { combineReducers } from "redux";

import {
    scrutinyReducer,
    usersReducer,
    filterUsersReducer
} from "./users";

import {
    customersReducer,
} from "./customers";

export const rootReducer = combineReducers({
    scrutinyReducer,
    usersReducer,
    filterUsersReducer,
    customersReducer
});