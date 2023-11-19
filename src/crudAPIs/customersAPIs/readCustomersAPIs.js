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

export {
    readCustomers
}