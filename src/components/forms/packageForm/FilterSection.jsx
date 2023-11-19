import { useState, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { DateTime } from "luxon";

import { useSelector } from "react-redux";

import composeBouquet from "../../../functions/transactions/composeBouquet";
import { readTransactions } from "../../../crudAPIs/transactionsAPIs/readTransactionsAPIs";

const FilterSection = ({ requiredTools }) => {
    const {
        acNo,
        transactionDate,
        setBouquet
    } = requiredTools;

    const [dateOptions, setDateOptions] = useState();
    const [transactions, setTransactions] = useState();

    const monthOptions = useRef(DateTime.now().minus({ months: 1 }).toFormat("LLL"));
    const yearOptions = useRef(DateTime.now().toFormat("yyyy"));
    const selectDate = useRef("Select")

    const monthsList = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
    ];

    const yearsList = [];

    for (let year = DateTime.now().year; year >= 2022; year--) {
        yearsList.push(year);
    }

    const scrutinizedUser = useSelector(state => state.scrutinyUserReducer); // to get token

    useEffect(() => {
        const collectionName = transactionDate.length == 8
            ? transactionDate
            : DateTime.fromISO(transactionDate).toFormat("LLL-yyyy")

        listTransactions(collectionName, transactionDate);
    }, [])

    const listTransactions = async (collectionName, transactionDate) => {
        // Get transactions by A/c no
        const acNoTransactionsList = await readTransactions(scrutinizedUser, collectionName, acNo);

        setTransactions(acNoTransactionsList);

        setDateOptions(
            acNoTransactionsList?.filter((transaction, index, array) => {
                return array.findIndex(object =>
                    DateTime.fromISO(object.TransactionDateTime).toISODate()
                    === DateTime.fromISO(transaction.TransactionDateTime).toISODate()
                ) === index
            })
        );

        transactionDate && setBouquet(
            composeBouquet(acNoTransactionsList, DateTime.fromISO(transactionDate).toISODate())
        );
    };

    return (
        <div className="d-sm-flex col-lg-6 justify-content-center">
            {transactionDate?.length == 8 && <Form.Select name="year" defaultValue={yearOptions.current}
                onChange={(e) => {
                    yearOptions.current = e.target.value;
                    listTransactions(monthOptions.current + "-" + e.target.value);
                }}
            >
                {yearsList.map((year, index) =>
                    <option key={index} value={year}>{year}</option>
                )}
            </Form.Select>
            }

            {transactionDate?.length == 8 && <Form.Select name="month" defaultValue={monthOptions.current}
                onChange={(e) => {
                    monthOptions.current = e.target.value;
                    listTransactions(e.target.value + "-" + yearOptions.current);
                }}
            >
                {monthsList.map((month, index) =>
                    <option key={index} value={month}>{month}</option>
                )}
            </Form.Select>
            }

            {transactions?.length == 0
                ?
                <Form.Select name="noDate" disabled>
                    <option>No package found..</option>
                </Form.Select>

                : transactionDate?.length == 8 &&
                <Form.Select name="date" value={selectDate.current}
                    onChange={(e) => {
                        selectDate.current = e.target.value;
                        setBouquet(composeBouquet(transactions, e.target.value));
                    }}
                >
                    <option key={0}>Select</option>
                    {dateOptions?.map((dates, index) =>
                        <option key={index + 1} value={DateTime.fromISO(dates.TransactionDateTime).toISODate()}>
                            {DateTime.fromISO(dates.TransactionDateTime).toFormat("dd-LLL-yyyy")}
                        </option>
                    )}
                </Form.Select>
            }
        </div>
    )
}

export default FilterSection