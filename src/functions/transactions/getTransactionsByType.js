import { DateTime } from "luxon";
import _ from "lodash";

import { readTransactionsRequest } from "../../apiRequests/transactionsAPIs";

const getTransactionsByType = async (scrutinizedUser, yearMonth, selectedType) => {
    if (selectedType === "Expiry") {
        // const curCollectionName = DateTime.fromISO(`${yearMonth}-01`).toFormat("LLL-yyyy");
        const lastCollectionName = DateTime.fromISO(`${yearMonth}-01`).minus({ months: 1 }).toFormat("yyyy-LLL");
        const preLastCollectionName = DateTime.fromISO(`${yearMonth}-01`).minus({ months: 2 }).toFormat("yyyy-LLL");

        const curMonthYear = DateTime.fromISO(`${yearMonth}-01`).toFormat("yyyy-LLL");

        // const curTransactions = await readTransactions(scrutinizedUser, curCollectionName);
        const lastTransactions = await customersPackages(scrutinizedUser, lastCollectionName);
        const preLastTransactions = await customersPackages(scrutinizedUser, preLastCollectionName);

        // const filteredCurTransactions = await curTransactions.filter(curTransacions => {
        //     curTransacions.packageBill.sort((packBillA, packBillB) => packBillA.expiryDate - packBillB.expiryDate);

        //     return DateTime.fromISO(curTransacions.packageBill[0].expiryDate).toFormat("LLL-yyyy")
        //         === curDate
        // });

        // const filteredLastTransactions = await lastTransactions.filter(lastTransacions => {
        //     lastTransacions.packageBill.sort((packBillA, packBillB) => packBillA.expiryDate - packBillB.expiryDate);

        //     return DateTime.fromISO(lastTransacions.packageBill[0].expiryDate).toFormat("LLL-yyyy")
        //         === curDate
        // });

        // const filteredPreLastTransactions = await preLastTransactions.filter(preLastTransacions => {
        //     preLastTransacions.packageBill.sort((packBillA, packBillB) => packBillA.expiryDate - packBillB.expiryDate);

        //     return DateTime.fromISO(preLastTransacions.packageBill[0].expiryDate).toFormat("LLL-yyyy")
        //         === curDate
        // });

        const filteredLastTransactions = _.filter(await lastTransactions,
            transaction =>
                DateTime.fromISO(transaction.expiryDate).toFormat("yyyy-LLL") === curMonthYear
        );

        const filteredPreLastTransactions = _.filter(await preLastTransactions,
            transaction =>
                DateTime.fromISO(transaction.expiryDate).toFormat("yyyy-LLL") === curMonthYear
        );

        // const filteredLastTransactions = _.filter(await lastTransactions, { expiryDate: curMonthYear }
        //     // transction => DateTime.fromISO(transction.packageBill.map(packBill=>packBill.expiryDate)).toFormat("LLL-yyyy") === curDate
        //     // .map((packBill, index) => DateTime.fromISO(packBill[index].expiryDate).toFormat("LLL-yyyy") === curDate)
        // )

        // const filteredPreLastTransactions = _.filter(await preLastTransactions, { expiryDate: curMonthYear }
        //     // transction => DateTime.fromISO(transction.packageBill.map(packBill => packBill.expiryDate)).toFormat("LLL-yyyy") === curDate
        //     // .map((packBill, index) => DateTime.fromISO(packBill[index].expiryDate).toFormat("LLL-yyyy") === curDate)
        // )

        const mergedLastPreTasactions = [...filteredLastTransactions, ...filteredPreLastTransactions];

        return _.orderBy(mergedLastPreTasactions,
            [
                "expiryDate",
                "customer.AreaManager",
                "customer.AreaPerson"
            ],
            ["asc", "asc", "asc"]
        );
    }
    else {
        const curDocName = DateTime.fromISO(`${yearMonth}-01`).toFormat("yyyy-LLL");

        const curCustomerPackage = await customersPackages(scrutinizedUser, curDocName)

        return _.orderBy(curCustomerPackage,
            [
                "transactionDate",
                "customer.AreaManager",
                "customer.AreaPerson"
            ],
            ["asc", "asc", "asc"]
        );
    }
}

export default getTransactionsByType;

// This function get collections (customers and packagesBill) from server db and combine them
// This fuctions called by getTransactionsByType
const customersPackages = async (scrutinizedUser, curDocName) => {
    const {
        packagesBills,
        packageCustomers
    } =( await readTransactionsRequest(scrutinizedUser, "", curDocName));

    return await packagesBills?.map(packageBill => {
        const id = "61633" + packageBill.AcNo.split("").join("3");

        const customerIndex = packageCustomers.findIndex(customer => customer._id.toString() == id);

        const customer = packageCustomers[customerIndex];

        return {
            customer,
            ...packageBill
        }
    });
}