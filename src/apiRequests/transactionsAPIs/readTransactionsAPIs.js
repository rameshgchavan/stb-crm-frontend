import checkAdminGetDbName from "../../functions/checkAdminGetDbName"
import axios from "axios";

// Get all transactions of given month and year
const readTransactionsRequest = async (scrutinizedUser, collectionName, yearMonth) => {
    const { dbName } = checkAdminGetDbName(scrutinizedUser);

    return (
        (await axios(`/transactions`,
            {
                method: "post",
                headers: { authorization: `bearer ${scrutinizedUser.token}` },
                data: { dbName, collectionName, yearMonth }
            }
        ))?.data
    );
};

// get all packages by customer's account number
const readPackagesByAcNoRequest = async (scrutinizedUser, acNo) => {
    const { dbName } = checkAdminGetDbName(scrutinizedUser);

    return (
        (
            await axios.request(
                {
                    method: "POST",
                    url: "/transactions/packages",
                    headers: { authorization: `bearer ${scrutinizedUser.token}` },
                    data: { dbName, acNo }
                }
            )
        )?.data
    )
}

//Download Bulk Transactions.xlsx file
const downloadTransactionsSampleFileRequest = async (scrutinizedUser) => {
    return (
        (await axios(`/transactions/download`,
            {
                method: "post",
                headers: { authorization: `bearer ${scrutinizedUser.token}` },
                responseType: "blob"
            }
        ))?.data
    )
};

export {
    readTransactionsRequest,
    downloadTransactionsSampleFileRequest,
    readPackagesByAcNoRequest
}