import { Button, ButtonGroup, Container, Form, FormGroup } from "react-bootstrap"
import { useEffect, useRef, useState } from "react";
import { DateTime } from "luxon";

import { useDispatch, useSelector } from "react-redux";
import {
    summarizeTransactionsAction,
    filterSummarizedTransactionsAction,
    sliceFilteredTransactionsAction
} from "../../redux/actions";

import summarizeTransactions from "../../functions/transactions/summarizeTransactions";

const TransactionsFilter = () => {
    const dispatch = useDispatch();

    const cardsPerPage = useRef(12);
    const [currentPage, setCurrentPage] = useState(1);
    const lastPage = useRef(1);
    const firtCardIndex = useRef(0);
    const lastCardIndex = useRef(cardsPerPage.current);

    const selectedMonth = useRef(
        DateTime.now()
            .minus({ month: 1 })
            .toFormat("LLL")
    );

    const selectedYear = useRef(
        DateTime.now()
            .toFormat("yyyy")
    );

    const areaManager = useRef("All");
    const areaPerson = useRef("All");

    const searchedName = useRef("");

    const monthsList = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
    ];

    const yearsList = [];

    for (let year = DateTime.now().year; year >= 2022; year--) {
        yearsList.push(year);
    }

    const scrutiny = useSelector(state => state.scrutinyReducer); // to get token
    const customersList = useSelector(state => state.customersListReducer)?.data;
    const transacionsSummary = useSelector(state => state.transactionsSummaryReducer)?.data;
    const filteredSummarizedTtransactions = useSelector(state => state.summarizedTransactionsFilterationReducer)?.data;

    useEffect(() => {
        filterTransactions();
    }, [transacionsSummary])

    const getCollection = async () => {
        const collectionName = selectedMonth.current + "-" + selectedYear.current;

        dispatch(
            summarizeTransactionsAction(
                await summarizeTransactions(collectionName, scrutiny, customersList)
            )
        );
    }

    const listAreaManagers = () => {
        const areaManagers = customersList?.filter((customer, index, array) => {
            return array.findIndex(object =>
                object.AreaManager === customer.AreaManager
            ) === index
        })

        return areaManagers
    };

    const listAreaPersons = () => {
        const areaPersons = customersList?.filter(customer =>
            areaManager.current !== "All"
                ? customer.AreaManager === areaManager.current
                : customer.AreaManager
        )
            ?.filter((manager, index, array) => {
                return array.findIndex(object =>
                    object.AreaPerson === manager.AreaPerson
                ) === index
            });

        return areaPersons
    };

    const filterTransactions = () => {
        const filteredData = transacionsSummary
            ?.filter((transaction, index) => {
                return areaManager.current !== "All"
                    ? transaction.Customer?.AreaManager === areaManager.current
                    : transaction.Customer?.AreaManager
            })
            ?.filter((transaction, index) => {
                return areaPerson.current !== "All"
                    ? transaction.Customer?.AreaPerson === areaPerson.current
                    : transaction.Customer?.AreaPerson
            })
            ?.filter((transaction) => {
                return transaction.AcNo.toLowerCase().includes(searchedName.current.toLowerCase())
                    || transaction.Bill.toLowerCase().includes(searchedName.current.toLowerCase())
                    || transaction.Customer?.CustName.toLowerCase().includes(searchedName.current.toLowerCase())
                    || transaction.Customer?.MobNo.toLowerCase().includes(searchedName.current.toLowerCase())
                    || transaction.Customer?.VC_NDS_MAC_ID.toLowerCase().includes(searchedName.current.toLowerCase())
                    || transaction.Customer?.NDS_No.toLowerCase().includes(searchedName.current.toLowerCase())
                    || transaction.Customer?.STB_SN.toLowerCase().includes(searchedName.current.toLowerCase());
            });

        dispatch(filterSummarizedTransactionsAction(filteredData));

        setCurrentPage(1);

        sliceTransactions(filteredData);
    };

    const sliceTransactions = (filteredData, curPage = 1) => {
        lastCardIndex.current = curPage * cardsPerPage.current;
        firtCardIndex.current = lastCardIndex.current - cardsPerPage.current;
        lastPage.current = Math.ceil(filteredData?.length / cardsPerPage.current)

        dispatch(
            sliceFilteredTransactionsAction(
                filteredData?.slice(firtCardIndex.current, lastCardIndex.current),
                firtCardIndex.current
            )
        );
    }

    const handlePagination = (pageNo) => {
        sliceTransactions(filteredSummarizedTtransactions, pageNo);
        setCurrentPage(pageNo);
    }

    return (
        <Container className="bg-secondary shadow rounded-bottom">
            <Form className="py-1">
                <div className="d-lg-flex justify-content-between align-items-start">
                    <FormGroup className="d-flex col-lg-3">
                        <Form.Select name="year" defaultValue={selectedYear.current}
                            onChange={(e) => {
                                selectedYear.current = e.target.value;
                                getCollection();
                            }}
                        >
                            {yearsList.map(year =>
                                <option value={year}>{year}</option>
                            )}
                        </Form.Select>
                        <Form.Select name="month" defaultValue={selectedMonth.current}
                            onChange={(e) => {
                                selectedMonth.current = e.target.value;
                                getCollection();
                            }}
                        >
                            {monthsList.map(month =>
                                <option value={month}>{month}</option>
                            )}
                        </Form.Select>
                    </FormGroup>

                    <FormGroup className="d-flex align-items-start col-lg-5">
                        <Form.Select name="areaManager"
                            onChange={(e) => {
                                areaManager.current = e.target.value;
                                filterTransactions();
                            }}
                        >
                            <option>All</option>
                            {listAreaManagers()?.map((manager) => {
                                return <option>{manager.AreaManager}</option>
                            })}
                        </Form.Select>

                        <Form.Select name="areaPerosn"
                            onChange={(e) => {
                                areaPerson.current = e.target.value;
                                filterTransactions();
                            }}
                        >
                            <option>All</option>
                            {listAreaPersons()?.map((areaPerson) => {
                                return <option className="text-truncate">{areaPerson.AreaPerson}</option>
                            })}
                        </Form.Select>
                    </FormGroup>

                    <FormGroup size="sm" className="d-flex mt-lg-0 mt-1 align-items-start">
                        <Form.Control type="text"
                            placeholder="Type and search"
                            onChange={(e) => { searchedName.current = e.target.value }} />
                        <Button className="ms-2"
                            onClick={() => { filterTransactions(); }}
                        >Search</Button>
                    </FormGroup>
                </div>

                {filteredSummarizedTtransactions?.length > cardsPerPage.current &&
                    <FormGroup className="mt-2 d-flex justify-content-center align-items-start">
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
                                firtCardIndex.current + 1 == filteredSummarizedTtransactions?.length // if first index equal to no of records
                                    ? ""
                                    : firtCardIndex.current + 1 + "-"
                            }
                            {
                                lastCardIndex.current > filteredSummarizedTtransactions?.length // if last index is greater than no of records
                                    ? filteredSummarizedTtransactions?.length
                                    : lastCardIndex.current
                            }
                            {
                                " of " + filteredSummarizedTtransactions?.length
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
            </Form>
        </Container>
    )
}

export default TransactionsFilter