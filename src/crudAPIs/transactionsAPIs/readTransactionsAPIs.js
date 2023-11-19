import checkAdminGetDbName from "../../functions/checkAdminGetDbName"
import axios from "axios";

// Get all transactions of given month and year
const readTransactions = async (scrutinizedUser, collectionName, acNo) => {
    const { dbName } = checkAdminGetDbName(scrutinizedUser);

    return (
        (await axios(`/transactions`,
            {
                method: "post",
                headers: { authorization: `bearer ${scrutinizedUser.token}` },
                data: { dbName, collectionName, acNo }
            }
        ))?.data
    );
};

// List all months(Jan to Dec) transactions a/c no of given year
const readTransactionsAcNosOfYear = async (scrutinizedUser, ofYear) => {
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
    readTransactions,
    readTransactionsAcNosOfYear
}