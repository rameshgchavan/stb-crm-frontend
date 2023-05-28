import axios from "axios";
import { useEffect, useRef, useState } from "react";

import CustomerCard from "../components/cards/CustomerCard";
import { useDispatch, useSelector } from "react-redux";

import { listCustomersAction } from "../redux/actions";

const CustomersPage = () => {
    const dispatch = useDispatch();
    const cardsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(3);
    const lastCardIndex = useRef(currentPage * cardsPerPage);
    const firtCardIndex = useRef(lastCardIndex.current - cardsPerPage);

    const scrutiny = useSelector(state => state.scrutinyReducer);
    const customersList = useSelector(state => state.customersReducer).data.slice(firtCardIndex.current, lastCardIndex.current);

    useEffect(() => {
        listCustomers();
    }, [])

    const listCustomers = async () => {
        const customers = await axios("/customers", {
            method: "get",
            headers: { authorization: `bearer ${scrutiny.token}` }
        });

        dispatch(listCustomersAction(customers.data));
    }

    return (
        <div className="d-flex flex-wrap justify-content-evenly">
            {
                customersList?.map((customer, index) => {
                    return <CustomerCard
                        customer={{
                            key: customer._id,
                            SrNo: (index + 1) + firtCardIndex.current,
                            Name: customer.CustName,
                            Area: customer.Area,
                            Address: customer.Address,
                            Mobile: customer.MobNo
                        }}
                        stb={{
                            AcNo: customer.AcNo,
                            Status: customer.STBStatus,
                            LCOCode: customer.LCOCode,
                            VCNDSMAC_ID: customer.VC_NDS_MAC_ID
                        }}
                    />
                })
            }
        </div>
    )
}

export default CustomersPage
