import { combineReducers } from "redux";

import { scrutinyReducer, usersReducer } from "./users";

export const rootReducer = combineReducers({
    scrutinyReducer,
    usersReducer
})