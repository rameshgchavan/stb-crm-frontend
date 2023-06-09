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
