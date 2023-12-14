import { Form } from "react-bootstrap"
import { DateTime } from "luxon";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { RiCheckboxMultipleLine } from "react-icons/ri"
import { FaWhatsappSquare } from "react-icons/fa"
import { MdReadMore } from "react-icons/md"
import { SiBookstack } from "react-icons/si"
import CustomerModal from "../modals/CustomerModal";
import PackageModal from "../modals/PackageModal";
import { useState } from "react";

// This component shows customer's details and used by pages/CustomersPage 
const CustomerCard = ({ customer, srNo }) => {
    // Initialized state varibles
    const [customerModalShow, setCustomerModalShow] = useState(false);
    const [packageModalShow, setPackageModalShow] = useState(false);

    // Destructured and put aliases. Here name is an alias of CustName
    // Its not an object of key value pair.
    const {
        _id: id,
        CustName: name,
        MobNo: mobile,
        Area: area,
        Address: address,

        STBStatus: status,
        VC_NDS_MAC_ID: vcNdsMacId,
        AcNo: acNo,
        LCOCode: lcoCode,
        AreaManager: areaManager,
        AreaPerson: areaPerson,
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
                <Form.Group className="border rounded shadow p-2 mb-3" style={{ width: "20rem" }}>
                    <Form.Label className="d-flex justify-content-between fw-bold px-3">
                        <div className="fs-6 fw-bold text-start">{srNo}.</div>
                        <div style={{ fontSize: "0.8rem" }} >Ac:{acNo}</div>
                        <div style={{ fontSize: "0.8rem" }} >LCO:{lcoCode}</div>
                    </Form.Label>

                    <div className="shadow rounded p-2 mb-1">
                        <label className="d-block text-uppercase fw-bold text-primary text-truncate">{name}</label>
                        <Form.Label className="d-block text-truncate">{area}, {address}.<br /> Mobile: {mobile}</Form.Label>

                        <Form.Label className="d-flex fw-bold justify-content-between">
                            <div className="d-flex">
                                <div className="fw-bold text-primary">ID:{vcNdsMacId}</div>

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
                        <div style={{ fontSize: "0.8rem" }}
                            className={`${status == "ACTIVE" ? "text-success" : "text-danger"}
                     text-uppercase fw-bolder`}>{status}</div>

                        <SiBookstack size={30} className="text-warning"
                        // onClick={() => setPackageModalShow(true)}
                        />
                    </div>

                    <Form.Label className="d-flex justify-content-between text-truncate" >
                        <div className="me-3 lh-1">
                            <span style={{ fontSize: "x-small" }}>
                                {areaManager ? "Manager" : "NA"}
                            </span><br />
                            <span style={{ fontSize: "smaller", fontWeight: "bold" }}>
                                {areaManager ? areaManager : "NA"}
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
                </Form.Group>
            </Form>

            {/* Modal*/}
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
                acNo={acNo}
                transactionDate={DateTime.now().minus({ months: 1 }).toFormat("LLL-yyyy")}
            />
        </>
    )
}

export default CustomerCard