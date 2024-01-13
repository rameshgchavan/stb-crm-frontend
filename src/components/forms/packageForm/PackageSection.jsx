import { useRef } from "react";
import { FormGroup } from "react-bootstrap";
import PackageCard from "../../cards/PackageCard";

// This component used by packegeForm/index.js
// This component is part of package form and holds bouquet details
const PackageSection = ({ transaction }) => {
    const {
        totalBasePrice,
        totalLCOPrice,
        totalNCF, Bill,
        package: plans,
    } = transaction;

    const aLaCarteCount = useRef(0);

    return (
        <FormGroup className="border shadow rounded p-3">
            {plans.slice().sort((a, b) => a.Priority - b.Priority)
                .map((plan, index) => {
                    if (plan.Priority == 1 || plan.Priority == 2) {
                        return <div name="ftaPlan"
                            className={
                                `${plan.TransactionType == "Cancellation"
                                    ? "bg-light text-danger"
                                    : "bg-success text-light"} rounded-top`
                            }
                        >
                            <PackageCard key={index} plan={plan} />
                        </div>
                    }
                    else if (plan.Priority == 3) {
                        return <div name="broadcasterPlan"
                            className={
                                `${plan.TransactionType == "Cancellation"
                                    ? "bg-light text-danger"
                                    : "bg-warning"}`
                            }
                        >
                            <PackageCard key={index} plan={plan} />
                        </div>
                    }
                    else if (plan.Priority == 4) {
                        aLaCarteCount.current++;

                        return <div name="aLaCarte"
                            className={
                                `${plan.TransactionType == "Cancellation"
                                    ? "bg-light text-danger"
                                    : "bg-info text-light"}`
                            }
                        >
                            <PackageCard key={index} plan={plan} />
                        </div>
                    }
                    else
                        return <div name="unknown"
                            className={
                                `${plan.TransactionType == "Cancellation"
                                    ? "bg-light text-danger"
                                    : "bg-seondary text-light"}`
                            }
                        >
                            <PackageCard key={index} plan={plan} />
                        </div>
                })};

            <div name="ncf" className="d-lg-flex justify-content-between bg-secondary text-light rounded-bottom p-2 mb-1 text-lg-start">
                <div className="d-flex col-lg-3 justify-content-between">
                    <div className="fw-bold">NCF</div>
                    <div>Count: {totalNCF / 23.6 | 0}</div>
                    <div>Amount: {(totalNCF).toFixed(2)}</div>
                </div>

                <div>A-La-Carte Count: {aLaCarteCount.current}</div>

                <div>Toal LCO Price: {totalBasePrice.toFixed(2)}</div>
                <div>Total Base Price: {totalLCOPrice.toFixed(2)}</div>

                <div className="fs-5 fw-bold bg-danger text.light p-1 rounded m-0">
                    ₹ {Bill.toFixed(2)}
                </div>
            </div>
        </FormGroup >
    )
}

export default PackageSection