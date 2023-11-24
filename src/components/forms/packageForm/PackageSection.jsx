import { useState } from "react";
import { FormGroup } from "react-bootstrap";
import FilterSection from "./FilterSection";
import PackageCard from "../../cards/PackageCard";

// This component used by packegeForm/index.js
// This component is part of package form and holds bouquet details
const PackageSection = ({ acNo, transactionDate }) => {
    const [bouquet, setBouquet] = useState();

    return (
        <FormGroup className="border shadow rounded p-3">
            <FilterSection requiredTools={{ acNo, transactionDate, setBouquet }} />

            {transactionDate.length == 8 && <hr />}

            {bouquet?.ftaBouquet?.map((ftaBouquet, index) => {
                return <div name="ftaBouquet"
                    className={
                        `${ftaBouquet.TransactionType == "Cancellation"
                            ? "bg-light text-danger"
                            : "bg-success text-light"} rounded-top`
                    }
                >
                    <PackageCard key={index} bouquet={ftaBouquet} />
                </div>
            })}

            {bouquet?.msoBouquet?.map((msoBouquet, index) => {
                return <div name="msoBouquet"
                    className={
                        `${msoBouquet.TransactionType == "Cancellation"
                            ? "bg-light text-danger"
                            : "bg-success text-light"} rounded-top`
                    }
                >
                    <PackageCard key={index} bouquet={msoBouquet} />
                </div>
            })}

            {bouquet?.broadcasterBouquet?.map((broadcasterBouquet, index) => {
                return <div name="broadcasterPack"
                    className={
                        `${broadcasterBouquet.TransactionType == "Cancellation"
                            ? "bg-light text-danger"
                            : "bg-warning"}`
                    }
                >
                    <PackageCard key={index} bouquet={broadcasterBouquet} />
                </div>
            })}

            {bouquet?.aLaCarte?.map((aLaCarte, index) => {
                return <div name="aLaCarte"
                    className={
                        `${aLaCarte.TransactionType == "Cancellation"
                            ? "bg-light text-danger"
                            : "bg-info text-light"}`
                    }
                >
                    <PackageCard key={index} bouquet={aLaCarte} />
                </div>
            })}

            {bouquet?.unknown?.map((unknown, index) => {
                return <div name="unknown"
                    className={
                        `${unknown.TransactionType == "Cancellation"
                            ? "bg-light text-danger"
                            : "bg-seondary text-light"}`
                    }
                >
                    <PackageCard key={index} bouquet={unknown} />
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

                <div>Toal LCO Price: {(bouquet?.totalLCOPrice)?.toFixed(2)}</div>
                <div>Total Base Price: {(bouquet?.totalBasePrice)?.toFixed(2)}</div>

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