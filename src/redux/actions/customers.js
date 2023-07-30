import {
    LIST_CUSTOMERS, FILTER_CUSTOMERS, UPDATE_CUSTOMER
} from "../constants/customers"


const listCustomersAction = (data) => {
    return (
        {
            type: LIST_CUSTOMERS,
            data
        }
    )
};

const filterCustomersAction = (data, firtCardIndex) => {
    return (
        {
            type: FILTER_CUSTOMERS,
            data,
            firtCardIndex
        }
    )
};


const updateCustomerAction = (data, id) => {
    return (
        {
            type: UPDATE_CUSTOMER,
            data,
            id
        }
    )
};

export {
    listCustomersAction, filterCustomersAction,
    updateCustomerAction
};