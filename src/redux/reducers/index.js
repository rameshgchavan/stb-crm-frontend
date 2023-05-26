import { combineReducers } from "redux";

import {
    scrutinyReducer,
    usersReducer,
    filterUsersReducer
} from "./users";

export const rootReducer = combineReducers({
    scrutinyReducer,
    usersReducer,
    filterUsersReducer
});