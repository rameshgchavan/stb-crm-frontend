import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import CustomerCard from "../components/cards/CustomerCard";

import { listCustomersAction } from "../redux/actions";

const CustomersPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const scrutiny = useSelector(state => state.scrutinyReducer); // to get token
    const customersList = useSelector(state => state.customersListReducer)?.data;

    useEffect(() => {
        listCustomers();
    }, [])

    const listCustomers = async () => {
        const customers = await axios(`/customers/stb-crm`, {
            method: "get",
            headers: { authorization: `bearer ${scrutiny.token}` }
        });

        dispatch(listCustomersAction(customers?.data));
    }
   
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
                    onClick={() => navigate("/customer")}
                >Add New</Button>
            }
        </>
    )
}

export default CustomersPage
