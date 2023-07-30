import { LIST_CUSTOMERS, UPDATE_CUSTOMER } from "../../constants/customers"
// Initialize state
const initialState = {}

// Create and export Ruducers
export const customersListReducer = (state = initialState, action) => {
    // Destruct action
    const { type, data, id } = action;

    switch (type) {
        case LIST_CUSTOMERS:
            return { ...state, data };

        case UPDATE_CUSTOMER:
            const indexToUpdate = state.data.findIndex(customer => customer._id === id);
            state.data[indexToUpdate] = data;

            return state;

        default:
            return state
    }
}
