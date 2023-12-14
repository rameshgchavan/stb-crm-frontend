import checkAdminGetDbName from "../../functions/checkAdminGetDbName"
import axios from "axios";

// Save a new customer to database
const createCustomer = async (scrutinizedUser, customerData) => {
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
const createCustomers = async (scrutinizedUser, formData) => {
    const { dbName } = checkAdminGetDbName(scrutinizedUser);

    return (
        (await axios(`/customers/upload`,
            {
                method: "post",
                headers: { authorization: `bearer ${scrutinizedUser.token}`, dbName },
                data: formData
            }
        ))?.data
    )
};

export {
    createCustomer,
    createCustomers
}