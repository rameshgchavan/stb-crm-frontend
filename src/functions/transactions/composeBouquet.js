import { DateTime } from "luxon";

const composeBouquet = (acNoTransactionsList, trasactionDate) => {
    const ftaBouquet = acNoTransactionsList?.filter(transaction =>
        transaction.Priority === 1 &&
        DateTime.fromISO(transaction.TransactionDateTime).toISODate()
        === trasactionDate
    ).sort((a, b) => DateTime.fromISO(a.TransactionDateTime) - DateTime.fromISO(b.TransactionDateTime));

    const msoBouquet = acNoTransactionsList.filter(transaction =>
        transaction.Priority == 2 &&
        DateTime.fromISO(transaction.TransactionDateTime).toISODate()
        == trasactionDate
    ).sort((a, b) => DateTime.fromISO(a.TransactionDateTime) - DateTime.fromISO(b.TransactionDateTime));
    const broadcasterBouquet = acNoTransactionsList.filter(transaction =>
        transaction.Priority == 3 &&
        DateTime.fromISO(transaction.TransactionDateTime).toISODate()
        == trasactionDate
    ).sort((a, b) => DateTime.fromISO(a.TransactionDateTime) - DateTime.fromISO(b.TransactionDateTime));
    const aLaCarte = acNoTransactionsList.filter(transaction =>
        transaction.Priority == 4 &&
        DateTime.fromISO(transaction.TransactionDateTime).toISODate()
        == trasactionDate
    ).sort((a, b) => DateTime.fromISO(a.TransactionDateTime) - DateTime.fromISO(b.TransactionDateTime));
    const unknown = acNoTransactionsList.filter(transaction =>
        transaction.Priority < 1 &&
        DateTime.fromISO(transaction.TransactionDateTime).toISODate()
        == trasactionDate
    ).sort((a, b) => DateTime.fromISO(a.TransactionDateTime) - DateTime.fromISO(b.TransactionDateTime));

    let ncf = 0;
    let totalLCOPrice = 0;
    let totalBasePrice = 0;

    acNoTransactionsList.filter(transaction =>
        DateTime.fromISO(transaction.TransactionDateTime).toISODate()
        == trasactionDate
    )
        .sort((a, b) => DateTime.fromISO(a.TransactionDateTime) - DateTime.fromISO(b.TransactionDateTime))
        .map((transaction, index, array) => {
            totalLCOPrice += transaction.LCOPrice
            totalBasePrice += transaction.BasePrice

            array.filter(plan =>
                plan.PlanName === transaction.PlanName
            )

                .map((planName, index) => {
                    if (planName.TransactionType !== "Cancellation") {
                        ncf += planName.NCF
                    }
                    else if (planName.TransactionType === "Cancellation") {
                        if (index != 0) { ncf -= planName.NCF }
                    }
                });
        });

    return (
        {
            ftaBouquet, msoBouquet,
            broadcasterBouquet, aLaCarte,
            unknown, ncf,
            totalLCOPrice, totalBasePrice
        }
    )
}

export default composeBouquet