import { DateTime } from "luxon";

import summarizeTransactions from "./summarizeTransactions";
import { readTransactions } from "../../crudAPIs/transactionsAPIs";

const getSummarizedTransactionsByType = async (scrutinizedUser, customersList, yearMonth, selectedType) => {
    if (selectedType === "Expiry") {
        const curCollectionName = DateTime.fromISO(`${yearMonth}-01`).minus({ months: 1 }).toFormat("LLL-yyyy");
        const preCollectionName = DateTime.fromISO(`${yearMonth}-01`).minus({ months: 2 }).toFormat("LLL-yyyy");

        const lastDate = DateTime.fromISO(`${yearMonth}-01`).toFormat("LLL-yyyy");

        const curTransactions = await readTransactions(scrutinizedUser, curCollectionName);
        const preTransactions = await readTransactions(scrutinizedUser, preCollectionName);

        const filteredCurTransactions = await curTransactions.filter(curTransacions =>
            DateTime.fromISO(curTransacions.ExpiryDate).toFormat("LLL-yyyy")
            === lastDate);

        const filteredPreTransactions = await preTransactions.filter(preTransacions =>
            DateTime.fromISO(preTransacions.ExpiryDate).toFormat("LLL-yyyy")
            === lastDate);

        const mergedPreCurTasactions = [...filteredCurTransactions, ...filteredPreTransactions];

        const summarizedPreCurTasactions = await summarizeTransactions(mergedPreCurTasactions, customersList);

        return summarizedPreCurTasactions
            .sort((a, b) => {
                if (a.Customer?.AreaPerson > b.Customer?.AreaPerson) return 1
                if (a.Customer?.AreaPerson < b.Customer?.AreaPerson) return -1
                return 0
            })
            .sort((a, b) =>
                DateTime.fromISO(a.ExpiryDate) - DateTime.fromISO(b.ExpiryDate)
            );
    }
    else {
        const curCollectionName = DateTime.fromISO(`${yearMonth}-01`).toFormat("LLL-yyyy");

        const curTransactions = await readTransactions(scrutinizedUser, curCollectionName);

        const summarizedCurTrasaction = await summarizeTransactions(curTransactions, customersList);

        return summarizedCurTrasaction
            .sort((a, b) => {
                if (a.Customer?.AreaPerson > b.Customer?.AreaPerson) return 1
                if (a.Customer?.AreaPerson < b.Customer?.AreaPerson) return -1
                return 0
            })
            .sort((a, b) =>
                DateTime.fromISO(DateTime.fromISO(a.TransactionDateTime).toISODate()) -
                DateTime.fromISO(DateTime.fromISO(b.TransactionDateTime).toISODate())
            );
    }
}

export default getSummarizedTransactionsByType;