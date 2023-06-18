import axios from "axios";
import { DateTime } from "luxon";

import checkAdminGetDbName from "../checkAdminGetDbName";

const summarizeTransactions = async (collectionName, scrutinizedUser, customersList) => {
    const { isAdmin, dbName } = checkAdminGetDbName(scrutinizedUser);

    const transactionsList = (await axios(`/transactions`, {
        method: "post",
        headers: { authorization: `bearer ${scrutinizedUser.token}` },
        data: { dbName, collectionName }
    }))?.data;

    // Get unique transactions by AcNo and Date
    const uniqueTransactions = transactionsList?.filter((transaction, index, array) => {
        return array.findIndex(object =>
            object.AcNo === transaction.AcNo &&
            DateTime.fromISO(object.TransactionDateTime).toISODate()
            === DateTime.fromISO(transaction.TransactionDateTime).toISODate()
        ) === index
    })

    const summarizedTransactions = uniqueTransactions?.map((uniqueTransaction) => {
        let totalLCOPrice = 0;
        let totalBasePrice = 0;
        let totalNCF = 0;
        let Bill = 0;

        transactionsList.filter(transaction =>
            transaction.AcNo === uniqueTransaction.AcNo &&
            DateTime.fromISO(transaction.TransactionDateTime).toISODate()
            === DateTime.fromISO(uniqueTransaction.TransactionDateTime).toISODate()
        )
            .sort((a, b) => DateTime.fromISO(a.TransactionDateTime) - DateTime.fromISO(b.TransactionDateTime))
            .map((transaction, index, array) => {
                totalLCOPrice += transaction.LCOPrice;
                totalBasePrice += transaction.BasePrice;

                array.filter(plan =>
                    plan.PlanName === transaction.PlanName
                ).map((planName, index) => {
                    if (planName.TransactionType !== "Cancellation") {
                        totalNCF += planName.NCF
                    }
                    else if (planName.TransactionType === "Cancellation") {
                        if (index != 0) { totalNCF -= planName.NCF }
                    }
                });
            });

        totalNCF = (totalNCF / 25) | 0; //|0 for taking integer value for NCF count
        totalNCF = totalNCF * 23.6;

        Bill = totalBasePrice + totalNCF;

        //Populated customer for transactions 
        let customerIndex = customersList.findIndex((customer) => customer.AcNo.trim() === uniqueTransaction.AcNo)
        // uniqueTransactions[uniqueIndex]['Customer'] = customersList[customerIndex];

        return {
            ...uniqueTransaction,
            Customer: customersList[customerIndex],
            LCOPrice: totalLCOPrice.toFixed(2),
            BasePrice: totalBasePrice.toFixed(2),
            NCF: totalNCF.toFixed(2),
            Bill: Bill.toFixed(2)
        };
    });

    return summarizedTransactions;
};

export default summarizeTransactions;
