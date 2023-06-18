import { Button, ButtonGroup, Container, Form, FormGroup } from "react-bootstrap"
import { useEffect, useRef, useState } from "react";
import { DateTime } from "luxon";

import { useDispatch, useSelector } from "react-redux";
import {
    summarizeTransactionsAction,
    filterSummarizedTransactionsAction,
    sliceFilteredTransactionsAction,
    loadingAction, loadedAction
} from "../../redux/actions";

import getSummarizedTrasactionsByType from "../../functions/transactions/getSummarizedTrasactionsByType";

const TransactionsFilter = () => {
    const dispatch = useDispatch();

    const cardsPerPage = useRef(12);
    const [currentPage, setCurrentPage] = useState(1);
    const lastPage = useRef(1);
    const firtCardIndex = useRef(0);
    const lastCardIndex = useRef(cardsPerPage.current);

    const selectedDay = useRef("All");
    const selectedMonth = useRef(
        DateTime.now().toFormat("LL")
    );
    const selectedYear = useRef(
        DateTime.now().toFormat("yyyy")
    );

    const selectedType = useRef("Expiry");
    const searchedName = useRef("");

    const dayList = [];
    for (let day = 1; day <= 31; day++) {
        if (day < 10) {
            dayList.push('0' + day);
        }
        else dayList.push(day);
    }

    const monthsList = [
        { MMM: "Jan", MM: "01" }, { MMM: "Feb", MM: "02" },
        { MMM: "Mar", MM: "03" }, { MMM: "Apr", MM: "04" },
        { MMM: "May", MM: "05" }, { MMM: "Jun", MM: "06" },
        { MMM: "Jul", MM: "07" }, { MMM: "Aug", MM: "08" },
        { MMM: "Sep", MM: "09" }, { MMM: "Oct", MM: "10" },
        { MMM: "Nov", MM: "11" }, { MMM: "Dec", MM: "12" }
    ];

    const yearsList = [];
    for (let year = DateTime.now().year; year >= 2022; year--) {
        yearsList.push(year);
    }


    const customersList = useSelector(state => state.customersListReducer)?.data;
    const transacionsSummary = useSelector(state => state.transactionsSummaryReducer)?.data;
    const filteredSummarizedTtransactions = useSelector(state => state.summarizedTransactionsFilterationReducer)?.data;
    const scrutinizedUser = useSelector(state => state.scrutinyUserReducer);

    const { Admin, Name: userName } = scrutinizedUser;
    const isAdmin = Admin == "self" || Admin == "stb-crm" ? true : false;

    const areaManager = useRef(isAdmin ? "All" : userName);
    const areaPerson = useRef("All");

    useEffect(() => {
        filterTransactions();
    }, [])

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

    const getSummarizedTrasactions = async () => {
        const yearMonth = `${selectedYear.current}-${selectedMonth.current}`;

        dispatch(loadingAction());

        const summarizedTrasactionsByType = await getSummarizedTrasactionsByType(scrutinizedUser, customersList, yearMonth, selectedType.current);

        dispatch(
            summarizeTransactionsAction(summarizedTrasactionsByType)
        )

        dispatch(loadedAction());

        return summarizedTrasactionsByType;
    }

    const filterTransactions = async (transactions = false) => {
        const summarizedTrasactions = !transactions
            ? await getSummarizedTrasactions()
            : transacionsSummary;

        const filteredData = summarizedTrasactions
            ?.filter((transaction, index) => {
                // console.warn(DateTime.fromRFC2822(`${selectedDay.current} ${selectedMonth.current} ${selectedYear.current} 00:00 Z`).plus({ months: 1 }).toISODate());
                return selectedDay.current !== "All"
                    ? selectedType.current == "Expiry"
                        ? DateTime.fromISO(transaction?.ExpiryDate).toISODate() ===
                        DateTime.fromISO(`${selectedYear.current}-${selectedMonth.current}-${selectedDay.current}`).toISODate()
                        : DateTime.fromISO(transaction?.TransactionDateTime).toISODate() ===
                        DateTime.fromISO(`${selectedYear.current}-${selectedMonth.current}-${selectedDay.current}`).toISODate()
                    : transaction
            })
            ?.filter((transaction, index) => {
                return areaManager.current !== "All"
                    ? transaction.Customer?.AreaManager === areaManager.current
                    : transaction
            })
            ?.filter((transaction, index) => {
                return areaPerson.current !== "All"
                    ? transaction.Customer?.AreaPerson === areaPerson.current
                    : transaction
            })
            ?.filter((transaction) => {
                return transaction.AcNo.toLowerCase().includes(searchedName.current.toLowerCase())
                    || transaction.Bill.toLowerCase().includes(searchedName.current.toLowerCase())
                    || transaction.Customer?.CustName.toLowerCase().includes(searchedName.current.toLowerCase())
                    || transaction.Customer?.Area.toLowerCase().includes(searchedName.current.toLowerCase())
                    || transaction.Customer?.Address.toLowerCase().includes(searchedName.current.toLowerCase())
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
                    <FormGroup className="d-flex col-lg-4">
                        <Form.Select name="type" defaultValue={selectedType.current}
                            onChange={(e) => {
                                selectedType.current = e.target.value;
                                filterTransactions();
                            }}
                        >
                            <option value="Expiry">Expiry</option>
                            <option value="Recharge">Recharge</option>
                        </Form.Select>

                        <Form.Select name="year" defaultValue={selectedYear.current}
                            style={{ width: "10rem" }}
                            onChange={(e) => {
                                selectedYear.current = e.target.value;
                                filterTransactions();
                            }}
                        >
                            {yearsList.map((year, index) =>
                                <option key={index} value={year}>{year}</option>
                            )}
                        </Form.Select>
                        <Form.Select name="month" defaultValue={selectedMonth.current}
                            style={{ width: "8rem" }}
                            onChange={(e) => {
                                selectedMonth.current = e.target.value;
                                filterTransactions();
                            }}
                        >
                            {monthsList.map((month, index) =>
                                <option key={index} value={month.MM}>{month.MMM}</option>
                            )}
                        </Form.Select>
                        <Form.Select name="day" defaultValue={selectedDay.current}
                            style={{ width: "5rem" }}
                            onChange={(e) => {
                                selectedDay.current = e.target.value;
                                filterTransactions(true);
                            }}
                        >
                            <option value="All">All</option>
                            {dayList.map((day, index) =>
                                <option key={index} value={day}>{day}</option>
                            )}
                        </Form.Select>
                    </FormGroup>

                    <FormGroup className={`d-flex align-items-start ${isAdmin ? "col-lg-4" : "col-lg-3"}`}>
                        {isAdmin &&
                            <Form.Select name="areaManager"
                                onChange={(e) => {
                                    areaManager.current = e.target.value;
                                    filterTransactions(true);
                                }}
                            >
                                <option>All</option>
                                {listAreaManagers()?.map((manager, index) => {
                                    return <option key={index}>{manager.AreaManager}</option>
                                })}
                            </Form.Select>
                        }
                        <Form.Select name="areaPerosn"
                            onChange={(e) => {
                                areaPerson.current = e.target.value;
                               filterTransactions(true);
                            }}
                        >
                            <option>All</option>
                            {listAreaPersons()?.map((areaPerson, index) => {
                                return <option key={index} className="text-truncate">{areaPerson.AreaPerson}</option>
                            })}
                        </Form.Select>
                    </FormGroup>

                    <FormGroup size="sm" className="d-flex mt-lg-0 mt-1 align-items-start">
                        <Form.Control type="text"
                            placeholder="Type and search"
                            onChange={(e) => { searchedName.current = e.target.value }} />
                        <Button className="ms-2"
                            onClick={() => {filterTransactions(true); }}
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