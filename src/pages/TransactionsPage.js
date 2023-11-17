import { useSelector } from "react-redux";
import { useState } from "react";

import { Button } from "react-bootstrap";

import TransactionCard from "../components/cards/TransactionCard";
import TransactionsPrint from "../components/prints/TransactionsPrint";

const TransactionsPage = () => {
    const [showPreview, setShowPreview] = useState(false);

    const isLoading = useSelector(state => state.isLoadingReducer);

    // Note: data: filteredCustomers is not object key value pair
    // data: filteredCustomers <-- here  filteredCustomers is alias of data
    const { data: filteredTransactionsSlice, firtCardIndex } =
        useSelector(state => state.filteredTransactionsSliceReducer);

    return (
        <>
            {isLoading && filteredTransactionsSlice !== undefined && !showPreview &&
                <Button variant="success" size="sm" className="my-2"
                    onClick={() => { setShowPreview(true) }}
                >Show Print Preview</Button>
            }

            {isLoading && filteredTransactionsSlice !== undefined && showPreview &&
                <Button variant="danger" size="sm" className="my-2"
                    onClick={() => { setShowPreview(false) }}
                >Hide Print Preview</Button>
            }

            <div className="d-flex flex-wrap justify-content-evenly">
                {!isLoading
                    ? <h3>Loading...</h3>
                    : filteredTransactionsSlice?.length === 0
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

            {showPreview &&
                <TransactionsPrint />
            }
        </>
    )
}

export default TransactionsPage
