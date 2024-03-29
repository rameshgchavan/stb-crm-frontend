import checkAdminGetDbName from "../../functions/checkAdminGetDbName"
import axios from "axios";

// Save a new customer to database
const createCustomerRequest = async (scrutinizedUser, customerData) => {
    const { dbName } = checkAdminGetDbName(scrutinizedUser);

    return (
        (await axios(`/customers/save`,
            {
                method: "post",
                headers: { authorization: `bearer ${scrutinizedUser.token}` },
                data: { dbName, customerData }
            }
        ))?.data
    );
};

// Bulk create Customers by sending csv file
const createCustomersRequest = async (scrutinizedUser, fileData) => {
    const { dbName } = checkAdminGetDbName(scrutinizedUser);

    return (
        (await axios(`/customers/upload`,
            {
                method: "post",
                headers: { authorization: `bearer ${scrutinizedUser.token}`, dbName },
                data: { fileData }
            }
        ))?.data
    )
};

export {
    createCustomerRequest,
    createCustomersRequest
}