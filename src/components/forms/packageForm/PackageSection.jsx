import { useEffect, useRef, useState } from "react";
import { Form, FormGroup } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { DateTime } from "luxon";

const PackageSection = ({ acNo, transactionDate }) => {
    const selectedMonth = useRef("May");
    const selectedYear = useRef("2023");

    const dateLength = useRef(transactionDate.length);

    // const [transactions, setTransactions] = useState();
    const [bouquet, setBouquet] = useState();
    // const [selectedDate, setSelectedDate] = useState(DateTime.fromISO(transactionDate).toFormat("dd-LLL-yyyy"));

    const scrutiny = useSelector(state => state.scrutinyReducer); // to get token
    const collectionName = dateLength.current == 8
        ? transactionDate
        : DateTime.fromISO(transactionDate).toFormat("LLL-yyyy")

    useEffect(() => {
        listTransactions();
    }, [])

    const listTransactions = async () => {
        const transactionsList = (await axios(`/transactions/${collectionName}`,
            {
                method: "post",
                headers: { authorization: `bearer ${scrutiny.token}` },
                data: { acNo }
            }
        ))?.data

        const trasactionDate = DateTime.fromISO(transactionDate).toISODate()
        composeBouquet(transactionsList, trasactionDate);
    };

    const listDates = (transactionsList) => {
        return transactionsList?.filter((transactions, index, array) => {
            return array.findIndex(object =>
                DateTime.fromISO(object.TransactionDateTime).toISODate()
                === DateTime.fromISO(transactions.TransactionDateTime).toISODate()
            ) === index
        });
    };

    const composeBouquet = (transactionsList, trasactionDate) => {
        const ftaBouquet = transactionsList.filter(transaction =>
            transaction.Priority === 1 &&
            DateTime.fromISO(transaction.TransactionDateTime).toISODate()
            === trasactionDate
        );

        const msoBouquet = transactionsList.filter(transaction =>
            transaction.Priority == 2 &&
            DateTime.fromISO(transaction.TransactionDateTime).toISODate()
            == trasactionDate
        );
        const broadcasterBouquet = transactionsList.filter(transaction =>
            transaction.Priority == 3 &&
            DateTime.fromISO(transaction.TransactionDateTime).toISODate()
            == trasactionDate
        );
        const aLaCarte = transactionsList.filter(transaction =>
            transaction.Priority == 4 &&
            DateTime.fromISO(transaction.TransactionDateTime).toISODate()
            == trasactionDate
        );
        const unknown = transactionsList.filter(transaction =>
            transaction.Priority < 1 &&
            DateTime.fromISO(transaction.TransactionDateTime).toISODate()
            == trasactionDate
        );

        let ncf = 0;
        let totalLCOPrice = 0;
        let totalBasePrice = 0;

        transactionsList.filter(transaction =>
            DateTime.fromISO(transaction.TransactionDateTime).toISODate()
            == trasactionDate
        ).map((transaction, index, array) => {
            totalLCOPrice += transaction.LCOPrice
            totalBasePrice += transaction.BasePrice

            array.filter(plann =>
                plann.PlanName === transaction.PlanName
            ).map((planName, index) => {
                if (planName.TransactionType !== "Cancellation") {
                    ncf += planName.NCF
                }
                else if (planName.TransactionType === "Cancellation") {
                    if (index != 0) { ncf -= planName.NCF }
                }
            })
        });

        setBouquet(
            {
                ftaBouquet,
                msoBouquet,
                broadcasterBouquet,
                aLaCarte,
                unknown,
                ncf,
                totalLCOPrice,
                totalBasePrice
            }
        )
    }

    return (
        <FormGroup className="border shadow rounded p-3">
            <div className="d-sm-flex col-lg-6 justify-content-center">
                {transactionDate.length == 8 && <Form.Select name="year" defaultValue={selectedYear.current}
                    onChange={(e) => {
                        selectedYear.current = e.target.value;
                    }}
                >
                    <option value="2030">2030</option><option value="2029">2029</option>
                    <option value="2028">2028</option><option value="20327">2027</option>
                    <option value="2026">2026</option><option value="2025">2025</option>
                    <option value="2024">2024</option><option value="2023">2023</option>
                    <option value="2022">2022</option><option value="2021">2021</option>
                </Form.Select>
                }

                {transactionDate.length == 8 && <Form.Select name="month" defaultValue={selectedMonth.current}
                    onChange={(e) => {
                        selectedMonth.current = e.target.value;
                    }}
                >
                    <option value="Dec">Dec</option><option value="Nov">Nov</option>
                    <option value="Oct">Oct</option><option value="Sep">Sep</option>
                    <option value="Aug">Aug</option><option value="Jul">Jul</option>
                    <option value="Jun">Jun</option><option value="May">May</option>
                    <option value="Apr">Apr</option><option value="Mar">Mar</option>
                    <option value="Feb">Feb</option><option value="Jan">Jan</option>
                </Form.Select>
                }

                {transactionDate.length == 8 && <Form.Select name="date"
                    onChange={(e) => {
                        // setSelectedDate(e.target.value)
                        composeBouquet(e.target.value);
                    }}
                >
                    <option>Select</option>
                    {listDates()?.map(dates =>
                        <option value={DateTime.fromISO(dates.TransactionDateTime).toISODate()}>
                            {DateTime.fromISO(dates.TransactionDateTime).toFormat("dd-LLL-yyyy")}
                        </option>
                    )}
                </Form.Select>
                }
            </div>

            {transactionDate.length == 8 && <hr />}

            {bouquet?.ftaBouquet?.map(ftaBouquet => {
                return <div name="ftaBouquet" className={`d-lg-flex justify-content-between 
                        ${ftaBouquet.TransactionType == "Cancellation" ? "bg-light text-danger" : "bg-success text-light"} 
                        rounded-top p-2 mb-1 text-lg-start`}
                >
                    <div className="fw-bold col-lg-3">{ftaBouquet.PlanName}</div>

                    <div className="d-flex gap-3 justify-content-between">
                        <div>SD: {ftaBouquet.SDCount}</div>
                        <div>HD: {ftaBouquet.HDCount}</div>
                        <div>Total: {ftaBouquet.SDCount + ftaBouquet.HDCount * 2}</div>
                    </div>
                    <div className="d-flex gap-3 justify-content-between">
                        <div>LCO Price: {ftaBouquet.LCOPrice}</div>
                        <div>Base Price: {ftaBouquet.BasePrice}</div>
                    </div>
                    <hr />
                    <div className="d-flex gap-3 justify-content-between">
                        <div className="d-sm-flex">
                            <div> {ftaBouquet.TransactionType}</div>

                            <div className="fw-bold">
                                : {DateTime.fromISO(ftaBouquet.TransactionDateTime).toFormat("dd-LLL-yyyy hh:mm:ss a")}
                            </div>
                        </div>
                        <div className="d-sm-flex">
                            <div>End Date</div>
                            <div className="fw-bold">
                                : {DateTime.fromISO(ftaBouquet.ExpiryDate).toFormat("dd-LLL-yyyy")}
                            </div>
                        </div>
                    </div>
                </div>
            })}

            {bouquet?.msoBouquet?.map(msoBouquet => {
                return <div name="msoBouquet" className={`d-lg-flex justify-content-between 
                       ${msoBouquet.TransactionType == "Cancellation" ? "bg-light text-danger" : "bg-success text-light"} 
                       rounded-top p-2 mb-1 text-lg-start`}
                >
                    <div className="fw-bold col-lg-3">{msoBouquet.PlanName}</div>

                    <div className="d-flex gap-3 justify-content-between">
                        <div>SD: {msoBouquet.SDCount}</div>
                        <div>HD: {msoBouquet.HDCount}</div>
                        <div>Total: {msoBouquet.SDCount + msoBouquet.HDCount * 2}</div>
                    </div>
                    <div className="d-flex gap-3 justify-content-between">
                        <div>LCO Price: {msoBouquet.LCOPrice}</div>
                        <div>Base Price: {msoBouquet.BasePrice}</div>
                    </div>
                    <hr />
                    <div className="d-flex gap-3 justify-content-between">
                        <div className="d-sm-flex">
                            <div> {msoBouquet.TransactionType}</div>

                            <div className="fw-bold">
                                : {DateTime.fromISO(msoBouquet.TransactionDateTime).toFormat("dd-LLL-yyyy hh:mm:ss a")}
                            </div>
                        </div>
                        <div className="d-sm-flex">
                            <div>End Date</div>
                            <div className="fw-bold">
                                : {DateTime.fromISO(msoBouquet.ExpiryDate).toFormat("dd-LLL-yyyy")}
                            </div>
                        </div>
                    </div>
                </div>
            })}

            {bouquet?.broadcasterBouquet?.map(broadcasterBouquet => {
                return <div name="broadcasterPack" className={`d-lg-flex justify-content-between 
                        ${broadcasterBouquet.TransactionType == "Cancellation" ? "bg-light text-danger" : "bg-warning"} 
                        rounded-bottom p-2 mb-1 text-lg-start`}
                >
                    <div className="fw-bold col-lg-3">{broadcasterBouquet.PlanName}</div>

                    <div className="d-flex gap-3 justify-content-between">
                        <div>SD: {broadcasterBouquet.SDCount}</div>
                        <div>HD: {broadcasterBouquet.HDCount}</div>
                        <div>Total: {broadcasterBouquet.SDCount + broadcasterBouquet.HDCount * 2}</div>
                    </div>
                    <div className="d-flex gap-3 justify-content-between">
                        <div>LCO Price: {broadcasterBouquet.LCOPrice}</div>
                        <div>Base Price: {broadcasterBouquet.BasePrice}</div>
                    </div>
                    <hr />
                    <div className="d-flex gap-3 justify-content-between">
                        <div className="d-sm-flex">
                            <div> {broadcasterBouquet.TransactionType}</div>
                            <div className="fw-bold">
                                : {DateTime.fromISO(broadcasterBouquet.TransactionDateTime).toFormat("dd-LLL-yyyy hh:mm:ss a")}
                            </div>
                        </div>
                        <div className="d-sm-flex">
                            <div>End Date</div>
                            <div className="fw-bold">
                                : {DateTime.fromISO(broadcasterBouquet.ExpiryDate).toFormat("dd-LLL-yyyy")}
                            </div>
                        </div>
                    </div>
                </div>
            })}

            {bouquet?.aLaCarte?.map(aLaCarte => {
                return <div name="aLaCarte" className={`d-lg-flex justify-content-between 
                       ${aLaCarte.TransactionType == "Cancellation" ? "bg-light text-danger" : "bg-info text-light"} 
                       rounded-bottom p-2 mb-1 text-lg-start`}
                >
                    <div className="fw-bold col-lg-3">{aLaCarte.PlanName}</div>

                    <div className="d-flex gap-3 justify-content-between">
                        <div>SD: {aLaCarte.SDCount}</div>
                        <div>HD: {aLaCarte.HDCount}</div>
                        <div>Total: {aLaCarte.SDCount + aLaCarte.HDCount * 2}</div>
                    </div>
                    <div className="d-flex gap-3 justify-content-between">
                        <div>LCO Price: {aLaCarte.LCOPrice}</div>
                        <div>Base Price: {aLaCarte.BasePrice}</div>
                    </div>
                    <hr />
                    <div className="d-flex gap-3 justify-content-between">
                        <div className="d-sm-flex">
                            <div> {aLaCarte.TransactionType}</div>
                            <div className="fw-bold">
                                : {DateTime.fromISO(aLaCarte.TransactionDateTime).toFormat("dd-LLL-yyyy hh:mm:ss a")}
                            </div>
                        </div>
                        <div className="d-sm-flex">
                            <div>End Date</div>
                            <div className="fw-bold">
                                : {DateTime.fromISO(aLaCarte.ExpiryDate).toFormat("dd-LLL-yyyy")}
                            </div>
                        </div>
                    </div>
                </div>
            })}

            {bouquet?.unknown?.map(unknown => {
                return <div name="unknown" className={`d-lg-flex justify-content-between 
                        ${unknown.TransactionType == "Cancellation" ? "bg-light text-danger" : "bg-secondary text-light"} 
                        rounded-bottom p-2 mb-1 text-lg-start`}
                >
                    <div className="fw-bold col-lg-3">{unknown.PlanName}</div>

                    <div className="d-flex gap-3 justify-content-between">
                        <div>SD: {unknown.SDCount}</div>
                        <div>HD: {unknown.HDCount}</div>
                        <div>Total: {unknown.SDCount + unknown.HDCount * 2}</div>
                    </div>
                    <div className="d-flex gap-3 justify-content-between">
                        <div>LCO Price: {unknown.LCOPrice}</div>
                        <div>Base Price: {unknown.BasePrice}</div>
                    </div>
                    <hr />
                    <div className="d-flex gap-3 justify-content-between">
                        <div className="d-sm-flex">
                            <div> {unknown.TransactionType}</div>
                            <div>
                                : {DateTime.fromISO(unknown.TransactionDateTime).toFormat("dd-LLL-yyyy hh:mm:ss a")}
                            </div>
                        </div>
                        <div className="d-sm-flex">
                            <div>End Date</div>
                            <div className="text-nowrap">
                                : {DateTime.fromISO(unknown.ExpiryDate).toFormat("dd-LLL-yyyy")}
                            </div>
                        </div>
                    </div>
                </div>
            })}

            <div name="ncf" className="d-lg-flex justify-content-between bg-secondary text-light rounded-bottom p-2 mb-1 text-lg-start">
                <div className="d-flex col-lg-3 justify-content-between">
                    <div className="fw-bold">NCF</div>
                    <div>Count: {bouquet?.ncf / 25 | 0}</div>
                    <div>Amount: {((bouquet?.ncf / 25 | 0) * 23.6)?.toFixed(2)}</div>
                </div>

                <div>A-La-Carte Count: {
                    Math.abs(bouquet?.aLaCarte.filter(channel =>
                        channel.TransactionType !== "Cancellation").length
                        - bouquet?.aLaCarte.filter(channel =>
                            channel.TransactionType === "Cancellation").length
                    )
                }
                </div>

                <div>LCO Price Amount: {(bouquet?.totalLCOPrice)?.toFixed(2)}</div>
                <div>Base Price Amount: {(bouquet?.totalBasePrice)?.toFixed(2)}</div>

                <div className="fs-5 fw-bold bg-danger text.light p-1 rounded m-0">
                    ₹ {
                        (
                            bouquet?.totalBasePrice
                            + (bouquet?.ncf / 25 | 0)
                            * 23.6
                        )?.toFixed(2)
                    }
                </div>
            </div>
        </FormGroup >
    )
}

export default PackageSection