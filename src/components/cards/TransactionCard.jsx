import { Button, Form, FormGroup } from "react-bootstrap"
import { DateTime } from "luxon";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaWhatsappSquare } from "react-icons/fa"
import { MdReadMore } from "react-icons/md"
import { RiCheckboxMultipleLine } from "react-icons/ri"
import { useState } from "react";
import CustomerModal from "../modals/CustomerModal";
import PackageModal from "../modals/PackageModal";

const TransactionCard = ({ transaction, srNo }) => {
    const [customerModalShow, setCustomerModalShow] = useState(false);
    const [packageModalShow, setPackageModalShow] = useState(false);

    // Destructured and put aliases. Here rechargeDate is an alias of TransactionDateTime
    // Its not an object of key value pair.
    const {
        TransactionDateTime: rechargeDate,
        ExpiryDate: lastDate,
        Bill: bill,
        AcNo: acNo
    } = transaction;

    const id = transaction?.Customer?._id;
    const name = transaction?.Customer?.CustName;
    const area = transaction?.Customer?.Area;
    const mobile = transaction?.Customer?.MobNo;
    const lcoCode = transaction?.Customer?.LCOCode;
    const vcNdsMacId = transaction?.Customer?.VC_NDS_MAC_ID;
    const areaPerson = transaction?.Customer?.AreaPerson;
    const areaManager = transaction?.Customer?.AreaManager;

    const copyToShare = `*Name:* ${name}
*Area:* ${area}
*Mobile:* ${mobile}
*Area||Person:* ${areaPerson}
*A/c:* ${acNo}
*LCO:* ${lcoCode}
*ID:* ${vcNdsMacId}`;

    return (
        <>
            <Form >
                <FormGroup className="border rounded shadow px-3 py-2 mb-3" style={{ width: "20rem" }}>
                    <Form.Label className="d-flex justify-content-between fw-bold">
                        <div className="text-start">{srNo}.</div>
                        <div style={{ fontSize: "0.8rem" }} className="text-success text-nowrap">{DateTime.fromISO(rechargeDate).toFormat("dd-LLL-yy")}</div>
                        <div style={{ fontSize: "0.8rem" }} className="text-danger text-nowrap">{DateTime.fromISO(lastDate).toFormat("dd-LLL-yy")}</div>
                        <div>Ac:{acNo}</div>
                    </Form.Label>

                    <Form.Label className="d-block text-uppercase fw-bold text-primary text-truncate">{name ? name : "N/A"}</Form.Label>
                    <Form.Label className="d-block text-truncate">{area}<br /> {mobile ? mobile : "N/A"}</Form.Label>

                    <Form.Label className="d-flex fw-bold justify-content-between">
                        <div>LCO:{lcoCode ? lcoCode : "N/A"}</div>
                        <div className="text-primary">ID:{vcNdsMacId ? vcNdsMacId : "N/A"}</div>

                        <CopyToClipboard text={vcNdsMacId}>
                            <RiCheckboxMultipleLine size={18} className="text-secondary"
                                onClick={() => alert("ID copied.")}
                            />
                        </CopyToClipboard>
                    </Form.Label>

                    <div className="d-flex justify-content-between">
                        <Button variant="warning"
                            onClick={() => setPackageModalShow(true)}
                        >₹{bill}</Button>

                        <CopyToClipboard text={copyToShare}>
                            <FaWhatsappSquare size={30} className="text-success"
                                onClick={() => alert("Copied to share on whatsapp")}
                            />
                        </CopyToClipboard>

                        <MdReadMore size={35} className="text-primary"
                            onClick={() => setCustomerModalShow(true)}
                        />
                    </div>

                    <hr />
                    <Form.Label className="d-flex justify-content-between text-truncate" >
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

            <CustomerModal
                showMe={customerModalShow}
                closeMe={setCustomerModalShow}
                title={"Edit customer"}
                id={id}
            />

            <PackageModal
                showMe={packageModalShow}
                closeMe={setPackageModalShow}
                title={"Package"}
                acNo={acNo}
                transactionDate={DateTime.fromISO(rechargeDate).toISODate()}
            />
        </>
    )
}

export default TransactionCard