import { createSlice } from "@reduxjs/toolkit";

// initialized state
const initialState =
{
    customers: [],
    filteredCustomers: [],
    firtCardIndex: 0
};

const customersSlice = createSlice({
    name: "customers",
    initialState,
    reducers:
    {
        // setting data in customers array
        addCustomersAction: (state, action) => {
            // overriding customers and spreading payload array
            state.customers = [...action.payload];
        },
        // adding new customer in customers array
        addCustomerAction: (state, action) => {
            state.customers.push(action.payload);
        },
        // setting data in filteredCustomers array and firstCardIndex 
        addFilteredCustomersAction: (state, action) => {
            // overriding customers and spreading payload array
            state.filteredCustomers = [...action.payload.filteredData];
            state.firtCardIndex = action.payload.firtCardIndex;
        },
        updateCustomerAction: (state, action) => {
            const { id, customerData } = action.payload;
        }
    }
});

// exporting actions
export const {
    addCustomerAction,
    addCustomersAction,
    addFilteredCustomersAction,
    updateCustomerAction
} = customersSlice.actions;
// exporting reducer
export default customersSlice.reducer;