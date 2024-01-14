import { DateTime } from "luxon"
import { Button } from "react-bootstrap"
import PackageModal from "../modals/PackageModal";
import { useState } from "react";

// This comsponent shows the packages history
// This comsponent is used by modals/PackageHistoryModal
const PackageHistoryCard = ({ customer, packageHistory }) => {
    const {
        transactionDate: rechargeDate,
        expiryDate: lastDate,
        Bill: bill
    } = packageHistory;

    const [packageModalShow, setPackageModalShow] = useState(false);

    return (
        <>
            <div className="d-flex justify-content-between shadow py-1 px-4 rounded">
                <div>
                    <div style={{ fontSize: "0.8rem" }} className="text-success text-nowrap fw-bold">RC Date: {DateTime.fromISO(rechargeDate).toFormat("dd-LLL-yyyy")}</div>
                    <div style={{ fontSize: "0.8rem" }} className="text-danger text-nowrap fw-bold">Last Date: {DateTime.fromISO(lastDate).toFormat("dd-LLL-yyyy")}</div>
                </div>

                <Button variant="warning"
                    onClick={() => setPackageModalShow(true)}
                >₹{bill.toFixed(2)}</Button>
            </div>

            {/* Modal */}
            <PackageModal
                showMe={packageModalShow}
                closeMe={setPackageModalShow}
                title={"Package"}
                transaction={{ ...packageHistory, customer }}
            />
        </>
    )
}

export default PackageHistoryCard;