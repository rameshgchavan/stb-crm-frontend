import {
     LIST_CUSTOMERS
} from "../constants/customers"


const listCustomersAction = (data) => {
    return (
        {
            type: LIST_CUSTOMERS,
            data
        }
    )
};

export {
    listCustomersAction
};