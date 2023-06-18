import axios from "axios";
import { DateTime } from "luxon";

import checkAdminGetDbName from "../checkAdminGetDbName";
import summarizeTransactions from "./summarizeTransactions"

const getSummarizedTrasactionsByType = async (scrutinizedUser, customersList, yearMonth, selectedType) => {
    const { isAdmin, dbName } = checkAdminGetDbName(scrutinizedUser);

    const getTransactions = async (dbName, collectionName) => {
        return (await axios(`/transactions`, {
            method: "post",
            headers: { authorization: `bearer ${scrutinizedUser.token}` },
            data: { dbName, collectionName }
        }))?.data;
    }

    if (selectedType == "Expiry") {
        const curCollectionName = DateTime.fromISO(`${yearMonth}-01`).minus({ months: 1 }).toFormat("LLL-yyyy");
        const preCollectionName = DateTime.fromISO(`${yearMonth}-01`).minus({ months: 2 }).toFormat("LLL-yyyy");

        const lastDate = DateTime.fromISO(`${yearMonth}-01`).toFormat("LLL-yyyy");

        const curTrasactions = await getTransactions(dbName, curCollectionName);
        const preTrasactions = await getTransactions(dbName, preCollectionName);

        const filteredCurTrasactions = await curTrasactions.filter(curTransacions =>
            DateTime.fromISO(curTransacions.ExpiryDate).toFormat("LLL-yyyy")
            === lastDate);

        const filteredPreTrasactions = await preTrasactions.filter(preTransacions =>
            DateTime.fromISO(preTransacions.ExpiryDate).toFormat("LLL-yyyy")
            === lastDate);

        const mergedPreCurTasactions = [...filteredCurTrasactions, ...filteredPreTrasactions];

        const summarizedPreCurTasactions = await summarizeTransactions(mergedPreCurTasactions, customersList);
        
        return summarizedPreCurTasactions.sort((a, b) => DateTime.fromISO(a.ExpiryDate) - DateTime.fromISO(b.ExpiryDate))

    }
    else {
        const curCollectionName = DateTime.fromISO(`${yearMonth}-01`).toFormat("LLL-yyyy");

        const curTrasactions = await getTransactions(dbName, curCollectionName);

        const summarizedCurTrasaction = await summarizeTransactions(curTrasactions, customersList);

        return summarizedCurTrasaction;
    }
}

export default getSummarizedTrasactionsByType;