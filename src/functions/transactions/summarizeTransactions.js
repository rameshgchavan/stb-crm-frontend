import { DateTime } from "luxon";

// If customer not found
const naCustomer = {
    AcNo: "AcNo N/A",
    Address: "Address N/A",
    Area: "Area N/A",
    AreaManager: "Area manager N/A",
    AreaPerson: "Area|Person N/A",
    CustDate: "CustDate N/A",
    CustName: "Name N/A",
    LCOCode: "LCO Code N/A",
    MobNo: "Mob N/A",
    NDS_No: "NDS N/A",
    Origin: "Origin N/A",
    Remark: "",
    SD_HD: "SD/HD N/A",
    STBLocation: "STBLocation N/A",
    STBState: "STB State N/A",
    STBStatus: "STB Status N/A",
    STB_SN: "STB SN N/A",
    STBs: "STBs N/A",
    SeedType: "Seed type N/A",
    VC_NDS_MAC_ID: "N/A"
}

const summarizeTransactions = async (transactions, customersList) => {
    // Get unique transactions by AcNo and Date
    const uniqueTransactions = transactions?.filter((transaction, index, array) => {
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

        transactions.filter(transaction =>
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

        // Converted ac no to ojbect id here 6163 ==ac. 6 is for character 3 for number
        const transOjectID = `61633${uniqueTransaction.AcNo.split("").join("3")}`;

        //Populated customer for transactions 
        let customerIndex = customersList.findIndex((customer) => customer._id === transOjectID)
        // uniqueTransactions[uniqueIndex]['Customer'] = customersList[customerIndex];

        return {
            ...uniqueTransaction,
            Customer: customerIndex == -1 ? naCustomer : customersList[customerIndex],
            LCOPrice: totalLCOPrice.toFixed(2),
            BasePrice: totalBasePrice.toFixed(2),
            NCF: totalNCF.toFixed(2),
            Bill: Bill.toFixed(2)
        };
    });

    return summarizedTransactions;
};

export default summarizeTransactions;
