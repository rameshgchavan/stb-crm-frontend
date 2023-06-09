import { useRef } from "react";
import { Form } from "react-bootstrap";
import { DateTime } from "luxon";

const FilterSection = ({ requiredTools }) => {
    const {
        transactions, listTransactions,
        composeBouquet, transactionDate,
        dateOptions, setBouquet
    } = requiredTools;

    const monthOptions = useRef(DateTime.now().minus({ months: 1 }).toFormat("LLL"));
    const yearOptions = useRef(DateTime.now().toFormat("yyyy"));

    const monthsList = [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
    ];

    const yearsList = [];

    for (let year = DateTime.now().year; year >= 2021; year--) {
        yearsList.push(year);
    }
    console.warn(transactionDate);
    return (
        <div className="d-sm-flex col-lg-6 justify-content-center">
            {transactionDate?.length == 8 && <Form.Select name="year" defaultValue={yearOptions.current}
                onChange={(e) => {
                    yearOptions.current = e.target.value;
                    listTransactions(monthOptions.current + "-" + e.target.value);
                }}
            >
                {yearsList.map(year =>
                    <option value={year}>{year}</option>
                )}
            </Form.Select>
            }

            {transactionDate?.length == 8 && <Form.Select name="month" defaultValue={monthOptions.current}
                onChange={(e) => {
                    monthOptions.current = e.target.value;
                    listTransactions(e.target.value + "-" + yearOptions.current);
                }}
            >
                {monthsList.map(month =>
                    <option value={month}>{month}</option>
                )}
            </Form.Select>
            }

            {transactions?.length == 0
                ?
                <Form.Select name="noDate" disabled>
                    <option>No package found..</option>
                </Form.Select>

                : transactionDate?.length == 8 &&
                <Form.Select name="date"
                    onChange={(e) => {
                        setBouquet(
                            composeBouquet(transactions, e.target.value)
                        );
                    }}
                >
                    <option>Select</option>
                    {dateOptions?.map(dates =>
                        <option value={DateTime.fromISO(dates.TransactionDateTime).toISODate()}>
                            {DateTime.fromISO(dates.TransactionDateTime).toFormat("dd-LLL-yyyy")}
                        </option>
                    )}
                </Form.Select>
            }
        </div>
    )
}

export default FilterSection