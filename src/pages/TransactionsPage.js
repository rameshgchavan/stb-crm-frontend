import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";

import { Button } from "react-bootstrap";

import TransactionCard from "../components/cards/TransactionCard";
import TrasactionsPrint from "../components/prints/TrasactionsPrint";

import summarizeTransactions from "../functions/transactions/summarizeTransactions";

import { summarizeTransactionsAction, loadingAction, loadedAction } from "../redux/actions";

const TransactionsPage = () => {
    const [showPreview, setShowPreview] = useState(false);
    const dispatch = useDispatch();

    const scrutinizedUser = useSelector(state => state.scrutinyUserReducer); // to get token
    const customersList = useSelector(state => state.customersListReducer)?.data;
    const isLoading = useSelector(state => state.isLoadingReducer);

    useEffect(() => {
        getCollection();
    }, [])

    const getCollection = async () => {
        const collectionName = DateTime.now()
            .minus({ months: 1 })
            .toFormat("LLL-yyyy");

        dispatch(loadingAction());

        dispatch(
            summarizeTransactionsAction(
                await summarizeTransactions(collectionName, scrutinizedUser, customersList)
            )
        );

        dispatch(loadedAction());
    }

    // Note: data: filteredCustomers is not object key value pair
    // data: filteredCustomers <-- here  filteredCustomers is alias of data
    const { data: filteredTransactionsSlice, firtCardIndex } =
        useSelector(state => state.filteredTransactionsSliceReducer);

    return (
        <>
            <div className="d-flex flex-wrap justify-content-evenly">
                {!isLoading
                    ? <h3>Loading...</h3>
                    : filteredTransactionsSlice?.length == 0
                        ? <h3>Oops... no record found.</h3>
                        : !showPreview && filteredTransactionsSlice?.map((transaction, index) => {
                            return <TransactionCard
                                key={transaction._id}
                                srNo={(index + 1) + firtCardIndex}
                                transaction={transaction}
                            />
                        })
                }
            </div>

            {isLoading && filteredTransactionsSlice?.length != 0 && !showPreview &&
                <Button variant="success" size="sm" className="my-2"
                    onClick={() => { setShowPreview(true) }}
                >Show Print Preview</Button>
            }

            {isLoading && filteredTransactionsSlice?.length != 0 && showPreview &&
                <Button variant="danger" size="sm" className="my-2"
                    onClick={() => { setShowPreview(false) }}
                >Hide Print Preview</Button>
            }

            {showPreview &&
                <TrasactionsPrint />
            }
        </>
    )
}

export default TransactionsPage
