import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CustomerCard from "../components/cards/CustomerCard";

const CustomersPage = () => {
    const navigate = useNavigate();

    // Note: data: filteredCustomers is not object key value pair
    // data: filteredCustomers <-- here  filteredCustomers is alias of data
    const { data: filteredCustomers, firtCardIndex } =
        useSelector(state => state.customersFilterationReducer);

    return (
        <>
            <div className="d-flex flex-wrap justify-content-evenly">
                {filteredCustomers?.length == 0 ? <h3>Oops... no record found.</h3> : ""}

                {
                    filteredCustomers?.map((customer, index) => {
                        return <CustomerCard
                            key={customer._id}
                            srNo={(index + 1) + firtCardIndex}
                            customer={customer}
                        />
                    })
                }
            </div>

            <Button variant="success" size="sm" className="my-4"
                onClick={() => navigate("/customer")}
            >Add New</Button>
        </>
    )
}

export default CustomersPage
