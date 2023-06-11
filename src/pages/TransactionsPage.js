import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";

import TransactionCard from "../components/cards/TransactionCard";

import summarizeTransactions from "../functions/transactions/summarizeTransactions";

import { summarizeTransactionsAction } from "../redux/actions";
import { Button } from "react-bootstrap";

const TransactionsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
    const { data: filteredTransactionsSlice, firtCardIndex } =
        useSelector(state => state.filteredTransactionsSliceReducer);

    return (
        <>
            <div className="d-flex flex-wrap justify-content-evenly">
                {!filteredTransactionsSlice || filteredTransactionsSlice?.length == 0 ? <h3>Oops... no record found.</h3> : ""}

                {
                    filteredTransactionsSlice?.map((transaction, index) => {
                        return <TransactionCard
                            key={transaction._id}
                            srNo={(index + 1) + firtCardIndex}
                            transaction={transaction}
                        />
                    })
                }
            </div>

            <Button variant="success" size="sm" className="my-4"
                onClick={() => navigate("/transactions/preview", "_blank")}
            >Preview</Button>
        </>
    )
}

export default TransactionsPage
