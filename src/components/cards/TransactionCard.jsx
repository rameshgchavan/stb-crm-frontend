import { Button, Form, FormGroup } from "react-bootstrap"
import { DateTime } from "luxon";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaWhatsappSquare } from "react-icons/fa"
import { MdReadMore } from "react-icons/md"
import { RiCheckboxMultipleLine } from "react-icons/ri"
import { useState } from "react";
import CustomerModal from "../modals/CustomerModal";
import PackageModal from "../modals/PackageModal";

// This component shows transaction details and used by pages/TrasactionsPage
const TransactionCard = ({ transaction, srNo }) => {
    // Initialized state varibles
    const [customerModalShow, setCustomerModalShow] = useState(false);
    const [packageModalShow, setPackageModalShow] = useState(false);

    //  Initialized customers data

    const {
        transactionDate: rechargeDate,
        expiryDate: lastDate,
        Bill: bill,
        customer,
    } = transaction;

    const {
        _id: id,
        CustName: name,
        Area: area,
        MobNo: mobile,
        AcNo: acNo,
        VC_NDS_MAC_ID: vcNdsMacId,
        LCOCode: lcoCode,
        AreaPerson: areaPerson,
        AreaManager: areaManager,
    } = customer;

    // Variable stores text to copy to clipboard
    const copyToShare = `*Name:* ${name}
*Area:* ${area}
*Mobile:* ${mobile}
*Area||Person:* ${areaPerson}
*A/c:* ${acNo}
*LCO:* ${lcoCode}
*ID:* ${vcNdsMacId}`;

    return (
        <>
            {/* Card */}
            <Form >
                <FormGroup className="border rounded shadow p-2 mb-3" style={{ width: "20rem" }}>
                    <Form.Label className="d-flex justify-content-between fw-bold px-3">
                        <div className="text-start">{srNo}.</div>
                        <div style={{ fontSize: "0.8rem" }}>Ac:{acNo}</div>
                        <div style={{ fontSize: "0.8rem" }}>LCO:{lcoCode ? lcoCode : "N/A"}</div>
                    </Form.Label>

                    <div className="shadow rounded p-2 mb-1">
                        <label className="d-block text-uppercase fw-bold text-primary text-truncate">{name ? name : "N/A"}</label>

                        <div className="d-flex justify-content-between">
                            <Form.Label className="d-block text-truncate"> {area}</Form.Label>
                            <Form.Label className="d-block text-truncate">{mobile ? mobile : "N/A"}</Form.Label>
                        </div>

                        <Form.Label className="d-flex fw-bold justify-content-between">
                            <div className="d-flex">
                                <div className="text-primary">ID:{vcNdsMacId ? vcNdsMacId : "N/A"}</div>

                                <CopyToClipboard text={vcNdsMacId}>
                                    <RiCheckboxMultipleLine size={18} className="text-secondary"
                                        onClick={() => alert("ID copied.")}
                                    />
                                </CopyToClipboard>
                            </div>

                            <CopyToClipboard text={copyToShare}>
                                <FaWhatsappSquare size={30} className="text-success"
                                    onClick={() => alert("Copied to share on whatsapp")}
                                />
                            </CopyToClipboard>

                            <MdReadMore size={35} className="text-primary"
                                onClick={() => setCustomerModalShow(true)}
                            />
                        </Form.Label>
                    </div>

                    <div className="d-flex justify-content-between shadow py-1 px-4 rounded">
                        <div>
                            <div style={{ fontSize: "0.8rem" }} className="text-success text-nowrap fw-bold">RC Date: {DateTime.fromISO(rechargeDate).toFormat("dd-LLL-yyyy")}</div>
                            <div style={{ fontSize: "0.8rem" }} className="text-danger text-nowrap fw-bold">Last Date: {DateTime.fromISO(lastDate).toFormat("dd-LLL-yyyy")}</div>
                        </div>

                        <Button variant="warning"
                            onClick={() => setPackageModalShow(true)}
                        >₹{bill.toFixed(2)}</Button>
                    </div>

                    <Form.Label className="d-flex justify-content-between text-truncate px-3" >
                        <div className="me-3 lh-1">
                            <span style={{ fontSize: "x-small" }}>
                                {areaManager ? "Manager" : "N/A"}
                            </span><br />
                            <span style={{ fontSize: "smaller", fontWeight: "bold" }}>
                                {areaManager ? areaManager : "N/A"}
                            </span>
                        </div>

                        <div className="text-truncate lh-1">
                            <span style={{ fontSize: "x-small" }}>
                                {areaPerson != areaManager && "Area"}
                            </span><br />
                            <span style={{ fontSize: "smaller", fontWeight: "bold" }}>
                                {areaPerson != areaManager && areaPerson}
                            </span>
                        </div>
                    </Form.Label>
                </FormGroup>
            </Form>

            {/* Modal */}
            <CustomerModal
                showMe={customerModalShow}
                closeMe={setCustomerModalShow}
                title={`ID: ${id}`}
                id={id}
            />

            {/* Modal */}
            <PackageModal
                showMe={packageModalShow}
                closeMe={setPackageModalShow}
                title={"Package"}
                transaction={transaction}
            />
        </>
    )
}

export default TransactionCard