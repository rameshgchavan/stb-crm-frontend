import axios from "axios";
import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { listCustomersAction, filterCustomersAction } from "../../redux/actions";

import { Button, ButtonGroup, Container, Form, FormGroup } from "react-bootstrap"

const CustomerFilter = () => {
    const dispatch = useDispatch();

    const cardsPerPage = useRef(12);
    const [currentPage, setCurrentPage] = useState(1);
    const lastPage = useRef(1);
    const firtCardIndex = useRef(0);
    const lastCardIndex = useRef(cardsPerPage.current);

    const searchedName = useRef("");
    const location = useRef("INLINE");

    const [filteredCustomres, setFilteredCutomers] = useState();

    const scrutiny = useSelector(state => state.scrutinyReducer); // to get token
    const customersList = useSelector(state => state.customersReducer)?.data;

    useEffect(() => {
        listCustomers();
    }, [])

    const listCustomers = async () => {
        const customers = await axios("/customers", {
            method: "get",
            headers: { authorization: `bearer ${scrutiny.token}` }
        });

        dispatch(listCustomersAction(customers?.data));
    }

    const filterCustomers = () => {
        let filteredData;

        if (location.current == "INLINE") {
            filteredData = customersList
                .filter((customer, index) => {
                    return customer.STBState == "Allocated"
                })
                .filter((customer) => {
                    return customer.STBLocation == "INLINE" || customer.STBLocation == "CAMEIN"
                })
                .filter((customer) => {
                    return customer.CustName.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.MobNo.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.AcNo.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.VC_NDS_MAC_ID.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.NDS_No.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.STB_SN.toLowerCase().includes(searchedName.current.toLowerCase());
                });
        }
        else if (location.current == "OTHER") {
            filteredData = customersList
                .filter((customer, index) => {
                    return customer.STBState != "Allocated"
                })
                .filter((customer) => {
                    return customer.STBLocation != "LEFTOUT" && customer.STBLocation != "OUTGONE"
                })
                .filter((customer) => {
                    return customer.CustName.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.MobNo.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.AcNo.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.VC_NDS_MAC_ID.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.NDS_No.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.STB_SN.toLowerCase().includes(searchedName.current.toLowerCase());
                });
        }
        else {
            filteredData = customersList
                .filter((customer) => {
                    return customer.STBLocation == location.current
                })
                .filter((customer) => {
                    return customer.CustName.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.MobNo.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.AcNo.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.VC_NDS_MAC_ID.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.NDS_No.toLowerCase().includes(searchedName.current.toLowerCase())
                        || customer.STB_SN.toLowerCase().includes(searchedName.current.toLowerCase());
                });
        }

        setFilteredCutomers(filteredData);
        setCurrentPage(1);

        sliceCustomers(filteredData);
    };

    const sliceCustomers = (filteredData, curPage = 1) => {
        lastCardIndex.current = curPage * cardsPerPage.current;
        firtCardIndex.current = lastCardIndex.current - cardsPerPage.current;
        lastPage.current = Math.ceil(filteredData?.length / cardsPerPage.current)

        dispatch(
            filterCustomersAction(
                filteredData?.slice(firtCardIndex.current, lastCardIndex.current),
                firtCardIndex.current
            )
        );
    }

    const handlePagination = (pageNo) => {
        sliceCustomers(filteredCustomres, pageNo);
        setCurrentPage(pageNo);
    }

    return (
        <Container className="bg-secondary shadow rounded-bottom">
            <Form className="d-lg-flex justify-content-between py-1">
                <ButtonGroup size="sm">
                    <Button variant="success"
                        onClick={() => { location.current = "INLINE"; filterCustomers(); }}
                    >INLINE</Button>

                    <Button variant="warning"
                        onClick={() => { location.current = "LEFTOUT"; filterCustomers(); }}
                    >LEFTOUT</Button>

                    <Button variant="danger"
                        onClick={() => { location.current = "OUTGONE"; filterCustomers(); }}
                    >OUTGONE</Button>

                    <Button variant="primary"
                        onClick={() => { location.current = "OTHER"; filterCustomers(); }}
                    >OTHER</Button>
                </ButtonGroup>

                {filteredCustomres?.length > cardsPerPage.current && <FormGroup className="mt-xl-0 mt-1">

                    {currentPage > 1 && <ButtonGroup size="sm">
                        <Button variant="dark" className="fw-bold text-light"
                            onClick={() => { handlePagination(1); }}
                        > First </Button>

                        <Button variant="light" className="fw-bold text-primary"
                            onClick={() => { handlePagination(currentPage - 1); }}
                        >Prev</Button>
                    </ButtonGroup>}

                    <Form.Label className="text-light mx-2">
                        {
                            firtCardIndex.current + 1 == filteredCustomres?.length // if first index equal to no of records
                                ? ""
                                : firtCardIndex.current + 1 + "-"
                        }
                        {
                            lastCardIndex.current > filteredCustomres?.length // if last index is greater than no of records
                                ? filteredCustomres?.length
                                : lastCardIndex.current
                        }
                        {
                            " of " + filteredCustomres?.length
                        }
                    </Form.Label>

                    {currentPage < lastPage.current && <ButtonGroup size="sm">
                        <Button variant="light" className="fw-bold text-primary"
                            onClick={() => { handlePagination(currentPage + 1); }}
                        >Next</Button>

                        <Button variant="dark" className="fw-bold text-light"
                            onClick={() => { handlePagination(lastPage.current); }}
                        >Last</Button>
                    </ButtonGroup>}
                </FormGroup>
                }

                <FormGroup size="sm" className="d-flex mt-xl-0 mt-1">
                    <Form.Control type="text"
                        placeholder="Type and search"
                        onChange={(e) => { searchedName.current = e.target.value }} />
                    <Button className="ms-2"
                        onClick={() => { filterCustomers(); }}
                    >Search</Button>
                </FormGroup>
            </Form>
        </Container>
    )
}

export default CustomerFilter