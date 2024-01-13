import checkAdminGetDbName from "../../functions/checkAdminGetDbName"
import axios from "axios";

// Update a customer
const updateCustomerRequest = async (scrutinizedUser, customerData, id) => {
    const { dbName } = checkAdminGetDbName(scrutinizedUser);

    return (
        (await axios(`/customers/update/${id}`,
            {
                method: "put",
                headers: { authorization: `bearer ${scrutinizedUser.token}` },
                data: { dbName, customerData }
            }
        ))?.data
    );
};

export {
    updateCustomerRequest
}