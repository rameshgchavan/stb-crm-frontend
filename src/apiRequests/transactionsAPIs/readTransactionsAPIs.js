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

// List all months(Jan to Dec) transactions a/c no of given year
const readTransactionsAcNosOfYearRequest = async (scrutinizedUser, ofYear) => {
    const { dbName } = checkAdminGetDbName(scrutinizedUser);

    return (
        (await axios(`/transactions/rcstbacno`,
            {
                method: "post",
                headers: { authorization: `bearer ${scrutinizedUser.token}` },
                data: { dbName, ofYear }
            }
        ))?.data
    )
};


export {
    readTransactionsRequest,
    downloadTransactionsSampleFileRequest,
    readTransactionsAcNosOfYearRequest
}