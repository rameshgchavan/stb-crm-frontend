import { Button } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";

import CustomerCard from "../components/cards/CustomerCard";
import CustomerModal from "../components/modals/CustomerModal";

// This page used by routes/PagesRoutes
// This page shows Customers cards
const CustomersPage = () => {
    // Get customer list form redux store
    const { filteredSlicedCustomers } = useSelector(state => state.customersReducer);
    const { slicedData, firstCardIndex } = filteredSlicedCustomers;

    const [customerModalShow, setCustomerModalShow] = useState(false);

    return (
        <>
            <div className="d-flex flex-wrap justify-content-evenly">
                {
                    slicedData?.length == 0
                        ? <h3>Oops... no record found.</h3>
                        : slicedData?.map((customer, index) => {
                            return <CustomerCard
                                key={customer._id}
                                srNo={(index + 1) + firstCardIndex}
                                customer={customer}
                            />
                        })
                }
            </div>

            {slicedData &&
                <Button variant="success" size="sm" className="my-4"
                    onClick={() => setCustomerModalShow(true)}
                >Add New</Button>
            }

            <CustomerModal
                showMe={customerModalShow}
                closeMe={setCustomerModalShow}
                title={"New customer"}
            />
        </>
    )
}

export default CustomersPage;