import { LOADING, LOADED } from "../constants/loading"
// Initialize state
const initialState = true;

// Create and export Ruducers
export const isLoadingReducer = (state = initialState, action) => {
   
    switch (action.type) {
        case LOADING:
            return false;
        case LOADED:
            return true;

        default:
            return state
    }
}
