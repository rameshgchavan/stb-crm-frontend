import {
    LIST_CUSTOMERS, FILTER_CUSTOMERS
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

export {
    listCustomersAction, filterCustomersAction
};