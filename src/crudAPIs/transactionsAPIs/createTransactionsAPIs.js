import checkAdminGetDbName from "../../functions/checkAdminGetDbName"
import axios from "axios";


// Create Transaction by sending csv file
const createTransactions = async (scrutinizedUser, formData, yearMonth) => {
    const { dbName } = checkAdminGetDbName(scrutinizedUser);
    return (
        (await axios(`/transactions/upload`,
            {
                method: "post",
                headers: { authorization: `bearer ${scrutinizedUser.token}`, dbName, yearMonth },
                data: formData
            }
        ))?.data
    )
};


export {
    createTransactions
}