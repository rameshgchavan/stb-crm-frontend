import { DateTime } from "luxon";

const PackageCard = ({ bouquet }) => {
    return (
        <div name="bouquet" className="d-lg-flex justify-content-between p-2 mb-1 text-lg-start">
            <div className="fw-bold col-lg-3">{bouquet.PlanName}</div>

            <div className="d-flex gap-3 justify-content-between">
                <div>SD: {bouquet.SDCount}</div>
                <div>HD: {bouquet.HDCount}</div>
                <div>Total: {bouquet.SDCount + bouquet.HDCount * 2}</div>
            </div>
            <div className="d-flex gap-3 justify-content-between">
                <div>LCO Price: {bouquet.LCOPrice}</div>
                <div>Base Price: {bouquet.BasePrice}</div>
            </div>
            <hr />
            <div className="d-flex gap-3 justify-content-between">
                <div className="d-sm-flex">
                    <div> {bouquet.TransactionType}</div>

                    <div className="fw-bold">
                        : {DateTime.fromISO(bouquet.TransactionDateTime).toFormat("dd-LLL-yyyy hh:mma")}
                    </div>
                </div>
                <div className="d-sm-flex">
                    <div>End Date</div>
                    <div className="fw-bold">
                        : {DateTime.fromISO(bouquet.ExpiryDate).toFormat("dd-LLL-yyyy")}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PackageCard