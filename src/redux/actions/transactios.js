import {
    LIST_TRANSACTIONS, FILTER_TRANSACTIONS, SUMMARIZE_TRANSACTIONS
} from "../constants/transactions"


const listTransactionsAction = (data) => {
    return (
        {
            type: LIST_TRANSACTIONS,
            data
        }
    )
};

const filterTransactionsAction = (data, firtCardIndex) => {
    return (
        {
            type: FILTER_TRANSACTIONS,
            data,
            firtCardIndex
        }
    )
};

const summarizeTransactionsAction = (data) => {
    return (
        {
            type: SUMMARIZE_TRANSACTIONS,
            data
        }
    )
};

export {
    listTransactionsAction, filterTransactionsAction, summarizeTransactionsAction
};