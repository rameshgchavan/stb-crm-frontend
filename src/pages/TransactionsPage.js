import { useSelector } from "react-redux";
import { useState } from "react";

import { Button } from "react-bootstrap";

// components
import TransactionCard from "../components/cards/TransactionCard";
import TransactionsPrint from "../components/prints/TransactionsPrint";
import LoadingModal from "../components/modals/LoadingModal";

// This page used by routes/PagesRoutes
// This page shows Transaction cards and toggle to print component
const TransactionsPage = () => {
    const [showPreview, setShowPreview] = useState(false);

    // getting filtered and sliced transactions
    const { filteredSlicedTransactions } = useSelector(state => state.transactionsReducer);
    // destructuring filteredSlicedTransactions object
    const { slicedData, firstCardIndex } = filteredSlicedTransactions;

    return (
        <>
            {slicedData.length > 0 && !showPreview &&
                <Button variant="success" size="sm" className="my-2"
                    onClick={() => { setShowPreview(true) }}
                >Show Print Preview</Button>
            }

            {slicedData.length > 0 && showPreview &&
                <Button variant="danger" size="sm" className="my-2"
                    onClick={() => { setShowPreview(false) }}
                >Hide Print Preview</Button>
            }

            <div className="d-flex flex-wrap justify-content-evenly">
                {
                    slicedData?.length === 0
                        ? <h3>Oops... no record found.</h3>
                        : !showPreview && slicedData?.map((transaction, index) => {
                            return <TransactionCard
                                key={index}
                                srNo={(index + 1) + firstCardIndex}
                                transaction={transaction}
                            />
                        })
                }
            </div>

            {showPreview &&
                <TransactionsPrint />
            }
            {/* showing loading modal if that taking time */}
            <LoadingModal />
        </>
    )
}

export default TransactionsPage
