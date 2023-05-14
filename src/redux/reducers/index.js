import { combineReducers } from "redux";

import { scrutinyReducer } from "./scrutiny";
import { usersReducer } from "./users";

export const rootReducer = combineReducers({ scrutinyReducer, usersReducer })