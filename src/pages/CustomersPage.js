import { Button } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";

import CustomerCard from "../components/cards/CustomerCard";
import CustomerModal from "../components/modals/CustomerModal";

// This page used by routes/PagesRoutes
// This page shows Customers cards
const CustomersPage = () => {
    // Get customer list form redux store
    const customersList = useSelector(state => state.customersListReducer)?.data;

    const [customerModalShow, setCustomerModalShow] = useState(false);

    // Note: data: filteredCustomers is not object key value pair
    // data: filteredCustomers <-- here  filteredCustomers is alias of data
    const { data: filteredCustomers, firtCardIndex } =
        useSelector(state => state.customersFilterationReducer);

    return (
        <>
            <div className="d-flex flex-wrap justify-content-evenly">
                {!customersList
                    ? <h3>Loading...</h3>
                    : filteredCustomers?.length == 0
                        ? <h3>Oops... no record found.</h3>
                        : filteredCustomers?.map((customer, index) => {
                            return <CustomerCard
                                key={customer._id}
                                srNo={(index + 1) + firtCardIndex}
                                customer={customer}
                            />
                        })
                }
            </div>

            {customersList &&
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