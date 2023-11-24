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

export {
    createCustomer
}