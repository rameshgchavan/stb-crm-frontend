import { useEffect, useState } from "react";
import { FormGroup } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { DateTime } from "luxon";

import composeBouquet from "../../../utils/transactions/composeBouquet";
import FilterSection from "./FilterSection";
import PackageCard from "../../cards/PackageCard";

const PackageSection = ({ acNo, transactionDate }) => {
    const [transactions, setTransactions] = useState();
    const [bouquet, setBouquet] = useState();
    const [dateOptions, setDateOptions] = useState();

    const scrutiny = useSelector(state => state.scrutinyReducer); // to get token

    useEffect(() => {
        const collectionName = transactionDate.length == 8
            ? transactionDate
            : DateTime.fromISO(transactionDate).toFormat("LLL-yyyy")

        listTransactions(collectionName);
    }, [])

    const listTransactions = async (collectionName) => {
        const transactionsList = (await axios(`/transactions/${collectionName}`,
            {
                method: "post",
                headers: { authorization: `bearer ${scrutiny.token}` },
                data: { acNo }
            }
        ))?.data

        setTransactions(transactionsList);

        setBouquet(
            composeBouquet(transactionsList, DateTime.fromISO(transactionDate).toISODate())
        );

        listDates(transactionsList);
    };

    const listDates = (transactionsList) => {
        setDateOptions(
            transactionsList?.filter((transaction, index, array) => {
                return array.findIndex(object =>
                    DateTime.fromISO(object.TransactionDateTime).toISODate()
                    === DateTime.fromISO(transaction.TransactionDateTime).toISODate()
                ) === index
            })
        );
    };

    return (
        <FormGroup className="border shadow rounded p-3">
            <FilterSection requiredTools={{
                transactions, listTransactions, composeBouquet,
                transactionDate, dateOptions, setBouquet
            }} />

            {transactionDate.length == 8 && <hr />}

            {bouquet?.ftaBouquet?.map(ftaBouquet => {
                return <div name="ftaBouquet"
                    className={
                        `${ftaBouquet.TransactionType == "Cancellation"
                            ? "bg-light text-danger"
                            : "bg-success text-light"}`
                    }
                >
                    <PackageCard bouquet={ftaBouquet} />
                </div>
            })}

            {bouquet?.msoBouquet?.map(msoBouquet => {
                return <div name="msoBouquet"
                    className={
                        `${msoBouquet.TransactionType == "Cancellation"
                            ? "bg-light text-danger"
                            : "bg-success text-light"}`
                    }
                >
                    <PackageCard bouquet={msoBouquet} />
                </div>
            })}

            {bouquet?.broadcasterBouquet?.map(broadcasterBouquet => {
                return <div name="broadcasterPack"
                    className={
                        `${broadcasterBouquet.TransactionType == "Cancellation"
                            ? "bg-light text-danger"
                            : "bg-warning"}`
                    }
                >
                    <PackageCard bouquet={broadcasterBouquet} />
                </div>
            })}

            {bouquet?.aLaCarte?.map(aLaCarte => {
                return <div name="aLaCarte"
                    className={
                        `${aLaCarte.TransactionType == "Cancellation"
                            ? "bg-light text-danger"
                            : "bg-info text-light"}`
                    }
                >
                    <PackageCard bouquet={aLaCarte} />
                </div>
            })}

            {bouquet?.unknown?.map(unknown => {
                return <div name="unknown"
                    className={
                        `${unknown.TransactionType == "Cancellation"
                            ? "bg-light text-danger"
                            : "bg-seondary text-light"}`
                    }
                >
                    <PackageCard bouquet={unknown} />
                </div>
            })}

            {transactions?.length > 0 &&
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
            }
        </FormGroup >
    )
}

export default PackageSection