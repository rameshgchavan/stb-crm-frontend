import { DateTime } from "luxon";

// This component shows bouquet details and used by forms/packageForm/PackageSection 
const PackageCard = ({ plan }) => {
    return (
        <div name="plans" className="d-lg-flex justify-content-between p-2 mb-1 text-lg-start">
            <div className="fw-bold col-lg-3">{plan.PlanName}</div>

            <div className="d-flex gap-3 justify-content-between">
                <div>SD: {plan.SDCount}</div>
                <div>HD: {plan.HDCount}</div>
                <div>Total: {plan.SDCount + plan.HDCount * 2}</div>
            </div>
            <div className="d-flex gap-3 justify-content-between">
                <div>LCO Price: {plan.LCOPrice}</div>
                <div>Base Price: {plan.BasePrice}</div>
            </div>
            <hr />
            <div className="d-flex gap-3 justify-content-between">
                <div className="d-sm-flex">
                    <div> {plan.TransactionType}</div>

                    <div className="fw-bold">
                        : {DateTime.fromISO(plan.TransactionDateTime).toFormat("dd-LLL-yyyy hh:mma")}
                    </div>
                </div>
                <div className="d-sm-flex">
                    <div>End Date</div>
                    <div className="fw-bold">
                        : {DateTime.fromISO(plan.ExpiryDate).toFormat("dd-LLL-yyyy")}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PackageCard