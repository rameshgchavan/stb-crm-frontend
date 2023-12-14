import checkAdminGetDbName from "../../functions/checkAdminGetDbName"
import axios from "axios";

// Get all customers of given month and year
const readCustomers = async (scrutinizedUser) => {
    const { dbName } = checkAdminGetDbName(scrutinizedUser);

    return (
        (await axios(`/customers/${dbName}`,
            {
                method: "get",
                headers: { authorization: `bearer ${scrutinizedUser.token}` }
            }
        ))?.data
    );
};

//Download Bulk Customer.xlsx file
const downloadCustomersSampleFile = async (scrutinizedUser) => {
    return (
        (await axios(`/customers/download`,
            {
                method: "post",
                headers: { authorization: `bearer ${scrutinizedUser.token}` },
                responseType: "blob"
            }
        ))?.data
    )
};

export {
    readCustomers,
    downloadCustomersSampleFile
}