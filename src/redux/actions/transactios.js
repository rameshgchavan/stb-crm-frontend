import {
    LIST_TRANSACTIONS, SUMMARIZE_TRANSACTIONS, FILTER_SUMMARIZED_TRANSACTIONS, SLICE_FILTERED_TRANSACTIONS,
} from "../constants/transactions"


const listTransactionsAction = (data) => {
    return (
        {
            type: LIST_TRANSACTIONS,
            data
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

const filterSummarizedTransactionsAction = (data) => {
    return (
        {
            type: FILTER_SUMMARIZED_TRANSACTIONS,
            data
        }
    )
};

const sliceFilteredTransactionsAction = (data, firtCardIndex) => {
    return (
        {
            type: SLICE_FILTERED_TRANSACTIONS,
            data,
            firtCardIndex
        }
    )
};

export {
    listTransactionsAction, summarizeTransactionsAction,
    filterSummarizedTransactionsAction, sliceFilteredTransactionsAction,
};