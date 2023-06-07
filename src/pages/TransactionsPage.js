import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { DateTime } from "luxon";

import TransactionCard from "../components/cards/TransactionCard";

import summarizeTransactions from "../utils/transactions/summarizeTransactions";

import { summarizeTransactionsAction } from "../redux/actions";

const TransactionsPage = () => {
    const dispatch = useDispatch();

    const scrutiny = useSelector(state => state.scrutinyReducer); // to get token
    const customersList = useSelector(state => state.customersListReducer)?.data;

    useEffect(() => {
        getCollection();
    }, [])

    const getCollection = async () => {
        const collectionName = DateTime.now()
            .minus({ months: 1 })
            .toFormat("LLL-yyyy");

        dispatch(
            summarizeTransactionsAction(
                await summarizeTransactions(collectionName, scrutiny, customersList)
            )
        );
    }

    // const summarizeTransactions = async () => {
    //     const transactionsList = (await axios("/transactions", {
    //         method: "get",
    //         headers: { authorization: `bearer ${scrutiny.token}` }
    //     }))?.data;

    //     // Get unique transactions by AcNo and Date
    //     const uniqueTransactions = transactionsList?.filter((transaction, index, array) => {
    //         return array.findIndex(object =>
    //             object.AcNo === transaction.AcNo &&
    //             DateTime.fromISO(object.TransactionDateTime).toISODate()
    //             === DateTime.fromISO(transaction.TransactionDateTime).toISODate()
    //         ) === index
    //     })

    //     const summarizedTransactions = uniqueTransactions?.map((uniqueTransaction) => {
    //         let totalLCOPrice = 0;
    //         let totalBasePrice = 0;
    //         let totalNCF = 0;
    //         let Bill = 0;

    //         transactionsList.filter(transaction =>
    //             transaction.AcNo === uniqueTransaction.AcNo &&
    //             DateTime.fromISO(transaction.TransactionDateTime).toISODate()
    //             === DateTime.fromISO(uniqueTransaction.TransactionDateTime).toISODate()
    //         ).map((transaction) => {
    //             totalLCOPrice += transaction.LCOPrice;
    //             totalBasePrice += transaction.BasePrice;
    //             totalNCF += transaction.NCF;
    //         });

    //         totalNCF = (totalNCF / 25) | 0; //|0 for taking integer value for NCF count
    //         totalNCF = totalNCF * 23.6;

    //         Bill = totalBasePrice + totalNCF;

    //         //Populated customer for transactions 
    //         let customerIndex = customersList.findIndex((customer) => customer.AcNo === uniqueTransaction.AcNo)
    //         // uniqueTransactions[uniqueIndex]['Customer'] = customersList[customerIndex];

    //         return {
    //             ...uniqueTransaction,
    //             Customer: customersList[customerIndex],
    //             LCOPrice: totalLCOPrice.toFixed(2),
    //             BasePrice: totalBasePrice.toFixed(2),
    //             NCF: totalNCF.toFixed(2),
    //             Bill: Bill.toFixed(2)
    //         };
    //     });

    //     dispatch(summarizeTransactionsAction(summarizedTransactions));
    // }

    // Note: data: filteredCustomers is not object key value pair
    // data: filteredCustomers <-- here  filteredCustomers is alias of data
    const { data: filteredTransactions, firtCardIndex } =
        useSelector(state => state.transactionsFilterationReducer);

    return (
        <>
            <div className="d-flex flex-wrap justify-content-evenly">
                {!filteredTransactions || filteredTransactions?.length == 0 ? <h3>Oops... no record found.</h3> : ""}

                {
                    filteredTransactions?.map((transaction, index) => {
                        return <TransactionCard
                            key={transaction._id}
                            srNo={(index + 1) + firtCardIndex}
                            transaction={transaction}
                        />
                    })
                }
            </div>
        </>
    )
}

export default TransactionsPage
