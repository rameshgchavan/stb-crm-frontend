import { Button, ButtonGroup, Container, Form, FormGroup } from "react-bootstrap"
import { useEffect, useRef, useState } from "react";
import { DateTime } from "luxon";

import { useDispatch, useSelector } from "react-redux";
import {
    summarizeTransactionsAction,
    filterSummarizedTransactionsAction,
    sliceFilteredTransactionsAction,
    loadingAction, loadedAction, listTransactionsAction
} from "../../redux/actions";

import getTransactionsByType from "../../functions/transactions/getTransactionsByType";
import { readTransactions } from "../../crudAPIs/transactionsAPIs";
import { FILTER_CUSTOMERS } from "../../redux/constants/customers";

/*This component filters transaction data as user choice*/
// This component is used in routes/FilterRoutes
const TransactionsFilter = () => {
    const dispatch = useDispatch();

    // Initialized pagination data
    const cardsPerPage = useRef(12);
    const [currentPage, setCurrentPage] = useState(1);
    const lastPage = useRef(1);
    const firtCardIndex = useRef(0);
    const lastCardIndex = useRef(cardsPerPage.current);

    // Getting and initialized user seletion from local storage
    const [filterSetting, setFilterSetting] = useState(JSON.parse(localStorage.getItem("FilterSetting")));

    // Initialized select option values
    const selectedDay = useRef(
        filterSetting?.transDay ||
        "All"
    );
    const selectedMonth = useRef(
        filterSetting?.transMonth ||
        DateTime.now().toFormat("LL")
    );
    const selectedYear = useRef(
        filterSetting?.transYear ||
        DateTime.now().toFormat("yyyy")
    );

    const selectedType = useRef(
        filterSetting?.transType ||
        "Expiry"
    );

    const searchedName = useRef("");

    // Initialized array of days
    const dayList = [];
    for (let day = 1; day <= 31; day++) {
        if (day < 10) {
            dayList.push('0' + day);
        }
        else dayList.push(day);
    }

    // Initialized array of months
    const monthsList = [
        { MMM: "Jan", MM: "01" }, { MMM: "Feb", MM: "02" },
        { MMM: "Mar", MM: "03" }, { MMM: "Apr", MM: "04" },
        { MMM: "May", MM: "05" }, { MMM: "Jun", MM: "06" },
        { MMM: "Jul", MM: "07" }, { MMM: "Aug", MM: "08" },
        { MMM: "Sep", MM: "09" }, { MMM: "Oct", MM: "10" },
        { MMM: "Nov", MM: "11" }, { MMM: "Dec", MM: "12" }
    ];

    // Initialized array of years and pushed year form 2022 to current year
    const yearsList = [];
    for (let year = DateTime.now().year; year >= 2022; year--) {
        yearsList.push(year);
    }

    /* Get customers list, transactions summery, filtered summerized transactions 
    and scrutinized user from redux store*/
    const customersList = useSelector(state => state.customersListReducer)?.data;
    const transacionsSummary = useSelector(state => state.transactionsSummaryReducer)?.data;
    const filteredSummarizedTtransactions = useSelector(state => state.summarizedTransactionsFilterationReducer)?.data;
    const scrutinizedUser = useSelector(state => state.scrutinyUserReducer);
    const transactionsList = useSelector(state => state.transactionsListReducer).data;

    // Checked and initialized. Is user admin or not.
    const { Admin, Name: userName } = scrutinizedUser;
    const isAdmin = Admin === "self" || Admin === "stb-crm" ? true : false;

    // Initialized select option valuess
    const areaManager = useRef(
        isAdmin
            ? filterSetting?.transAreaManager || "All"
            : userName
    );
    const areaPerson = useRef(
        filterSetting?.transAreaPerson ||
        "All"
    );

    useEffect(() => {
        filterTransactions();
    }, [transactionsList])

    // This function is called in option element to list area managers
    const listAreaManagers = () => {
        const areaManagers = customersList?.filter((customer, index, array) => {
            return array.findIndex(object =>
                object.AreaManager === customer.AreaManager
            ) === index
        })

        return areaManagers
    };

    // This function is called in option element to list area or persons
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

    // This function summerizes transaction and called by filterTransactions functions
    const getTransactions = async () => {
        const yearMonth = `${selectedYear.current}-${selectedMonth.current}`;

        // Update loading value to redux store using redux action to show Loading...
        dispatch(loadingAction());

        const transactionsByType = await getTransactionsByType(scrutinizedUser, yearMonth, selectedType.current);
        // console.warn(transactionsByType);

        // Update summerized data to redux store by using redux actions
        dispatch(
            listTransactionsAction(transactionsByType)
        )

        // Update loading value to redux store using redux action to hide Loading...
        dispatch(loadedAction());

        // filterTransactions();

        // return transactionsByType;
    }

    // This function filters transaction data as user choice
    // This function used by useEffect
    const filterTransactions = async () => {
        // // Initialized summerized transactions data
        // const summarizedTransactions = !transactions
        //     ? await getSummarizedTransactions()
        //     : transacionsSummary;

        // filter and return transaction data
        const filteredData = transactionsList
            ?.filter((transaction, index) => {
                // console.warn(DateTime.fromRFC2822(`${selectedDay.current} ${selectedMonth.current} ${selectedYear.current} 00:00 Z`).plus({ months: 1 }).toISODate());
                return selectedDay.current !== "All"
                    ? selectedType.current === "Expiry"
                        ? DateTime.fromISO(transaction.expiryDate).toISODate() ===
                        DateTime.fromISO(`${selectedYear.current}-${selectedMonth.current}-${selectedDay.current}`).toISODate()
                        : DateTime.fromISO(transaction.transactionDate).toISODate() ===
                        DateTime.fromISO(`${selectedYear.current}-${selectedMonth.current}-${selectedDay.current}`).toISODate()
                    : transaction
            })
        ?.filter((transaction, index) => {
            return areaManager.current !== "All"
                ? transaction.customer.AreaManager === areaManager.current
                : transaction
        })
        ?.filter((transaction, index) => {
            return areaPerson.current !== "All"
                ? transaction.customer.AreaPerson === areaPerson.current
                : transaction
        })
        ?.filter((transaction) => {
            return transaction?.AcNo?.includes(searchedName.current)
                || transaction?.Bill?.toString().includes(searchedName.current)
                || transaction?.customer.CustName?.toLowerCase().includes(searchedName.current.toLowerCase())
                || transaction?.customer.Area?.toLowerCase().includes(searchedName.current.toLowerCase())
                || transaction?.customer.Address?.toLowerCase().includes(searchedName.current.toLowerCase())
                || transaction?.customer.MobNo?.toLowerCase().includes(searchedName.current.toLowerCase())
                || transaction?.customer.VC_NDS_MAC_ID?.toLowerCase().includes(searchedName.current.toLowerCase())
        });

        // Update filtered summerized transaction to redux store using redux action
        dispatch(
            filterSummarizedTransactionsAction(filteredData)
        );

        setCurrentPage(1);

        // Send filtered transactions to slice
        sliceTransactions(filteredData);
    };

    // This function slice filterd transactions data and send to redux store
    // This function called by filterTransactions and handlePagination functions
    const sliceTransactions = (filteredData, curPage = 1) => {
        // Set up index for pages
        lastCardIndex.current = curPage * cardsPerPage.current;
        firtCardIndex.current = lastCardIndex.current - cardsPerPage.current;
        lastPage.current = Math.ceil(filteredData?.length / cardsPerPage.current)

        // Updating sliced data to redux store using redux action
        dispatch(
            sliceFilteredTransactionsAction(
                filteredData?.slice(firtCardIndex.current, lastCardIndex.current),
                firtCardIndex.current
            )
        );
    }

    // This function calls sliceTransactions and setCurrentPage functions
    // This function used by pagination element (buttons) to move on first, last, next and pre page
    const handlePagination = (pageNo) => {
        sliceTransactions(filteredSummarizedTtransactions, pageNo);
        setCurrentPage(pageNo);
    }

    return (
        <Container className="bg-secondary shadow rounded-bottom">
            <Form className="py-1">
                <div className="d-lg-flex justify-content-between align-items-start">
                    {/* Transaction type, year and month */}
                    <FormGroup className="d-flex col-lg-4">
                        <Form.Select name="type" defaultValue={selectedType.current}
                            onChange={(e) => {
                                selectedType.current = e.target.value;

                                setFilterSetting({
                                    ...filterSetting,
                                    transType: e.target.value
                                });

                                localStorage.setItem("FilterSetting", JSON.stringify({
                                    ...filterSetting,
                                    transType: e.target.value
                                }));
                            }}
                        >
                            <option value="Expiry">Expiry</option>
                            <option value="Recharge">Recharge</option>
                        </Form.Select>

                        <Form.Select name="year" defaultValue={selectedYear.current}
                            style={{ width: "10rem" }}
                            onChange={(e) => {
                                selectedYear.current = e.target.value;

                                setFilterSetting({
                                    ...filterSetting,
                                    transYear: e.target.value
                                });

                                localStorage.setItem("FilterSetting", JSON.stringify({
                                    ...filterSetting,
                                    transYear: e.target.value
                                }));
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

                                setFilterSetting({
                                    ...filterSetting,
                                    transMonth: e.target.value
                                });

                                localStorage.setItem("FilterSetting", JSON.stringify({
                                    ...filterSetting,
                                    transMonth: e.target.value
                                }));
                            }}
                        >
                            {monthsList.map((month, index) =>
                                <option key={index} value={month.MM}>{month.MMM}</option>
                            )}
                        </Form.Select>
                        <Button variant="success" className="border ms-2"
                            onClick={() => { getTransactions(); }}>
                            Go
                        </Button>
                    </FormGroup>

                    {/* Day, Area Manager and Area or Person */}
                    <FormGroup className={`d-flex align-items-start ${isAdmin ? "col-lg-4" : "col-lg-3"}`}>
                        <Form.Select name="day" defaultValue={selectedDay.current}
                            style={{ width: "5rem" }}
                            onChange={(e) => {
                                selectedDay.current = e.target.value;

                                setFilterSetting({
                                    ...filterSetting,
                                    transDay: e.target.value
                                });

                                localStorage.setItem("FilterSetting", JSON.stringify({
                                    ...filterSetting,
                                    transDay: e.target.value
                                }));

                                filterTransactions(true);
                            }}
                        >
                            <option value="All">All</option>
                            {dayList.map((day, index) =>
                                <option key={index} value={day}>{day}</option>
                            )}
                        </Form.Select>

                        {isAdmin &&
                            <Form.Select name="areaManager" defaultValue={areaManager.current}
                                onChange={(e) => {
                                    areaManager.current = e.target.value;

                                    setFilterSetting({
                                        ...filterSetting,
                                        transAreaManager: e.target.value
                                    });

                                    localStorage.setItem("FilterSetting", JSON.stringify({
                                        ...filterSetting,
                                        transAreaManager: e.target.value
                                    }));

                                    filterTransactions(true);
                                }}
                            >
                                <option>All</option>
                                {listAreaManagers()?.map((manager, index) => {
                                    return <option key={index}>{manager.AreaManager}</option>
                                })}
                            </Form.Select>
                        }
                        <Form.Select name="areaPerosn" defaultValue={areaPerson.current}
                            onChange={(e) => {
                                areaPerson.current = e.target.value;

                                setFilterSetting({
                                    ...filterSetting,
                                    transAreaPerson: e.target.value
                                });

                                localStorage.setItem("FilterSetting", JSON.stringify({
                                    ...filterSetting,
                                    transAreaPerson: e.target.value
                                }));

                                filterTransactions(true);
                            }}
                        >
                            <option>All</option>
                            {listAreaPersons()?.map((areaPerson, index) => {
                                return <option key={index} className="text-truncate">{areaPerson.AreaPerson}</option>
                            })}
                        </Form.Select>
                    </FormGroup>

                    {/* Type and search */}
                    <FormGroup size="sm" className="d-flex mt-lg-0 mt-1 align-items-start">
                        <Form.Control type="text"
                            placeholder="Type and search"
                            onChange={(e) => { searchedName.current = e.target.value }} />
                        <Button className="ms-2"
                            onClick={() => { filterTransactions(true); }}
                        >Search</Button>
                    </FormGroup>
                </div>

                {/* Page Navigation buttons */}
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
                                firtCardIndex.current + 1 === filteredSummarizedTtransactions?.length // if first index equal to no of records
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