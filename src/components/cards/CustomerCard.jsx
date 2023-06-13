import { Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { RiCheckboxMultipleLine } from "react-icons/ri"
import { FaWhatsappSquare } from "react-icons/fa"
import { MdReadMore } from "react-icons/md"
import { SiBookstack } from "react-icons/si"


const CustomerCard = ({ customer, srNo }) => {
    const navigate = useNavigate();

    // Destructured and put aliases. Here srNo is an alias of SrNo
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

    const copyToShare = `*Name:* ${name}
*Area:* ${area}
*Mobile:* ${mobile}
*Area||Person:* ${areaPerson}
*A/c:* ${acNo}
*LCO:* ${lcoCode}
*ID:* ${vcNdsMacId}`;

    return (
        <Form >
            <Form.Group className="border rounded shadow px-3 py-2 mb-3" style={{ width: "20rem" }}>
                <Form.Label className="d-flex justify-content-between fw-bold">
                    <div className="fs-6 fw-bold text-start">{srNo}.</div>
                    <div style={{ fontSize: "0.75rem" }}
                        className={`${status == "ACTIVE" ? "text-success" : "text-danger"}
                     text-uppercase fw-bolder text-start`}>{status}</div>
                      <div className="fs-6 fw-bold text-start">Ac:{acNo}</div>
                </Form.Label>

                <Form.Label className="d-block text-uppercase fw-bold text-primary text-truncate">{name}</Form.Label>
                <Form.Label className="d-block text-truncate">{area}, {address}.<br /> Mobile: {mobile}</Form.Label>

                <Form.Label className="d-flex fw-bold justify-content-between">
                    <div className="fw-bold">LCO:{lcoCode}</div>
                    <div className="fw-bold text-primary">ID:{vcNdsMacId}</div>

                    <CopyToClipboard text={vcNdsMacId}>
                        <RiCheckboxMultipleLine size={18} className="text-secondary"
                            onClick={() => alert("ID copied.")}
                        />
                    </CopyToClipboard>
                </Form.Label>

                <div className="d-flex justify-content-between">
                    <SiBookstack size={30} className="text-warning"
                        onClick={() => { navigate(`/package/${acNo}/${DateTime.now().minus({ months: 1 }).toFormat("LLL-yyyy")}`) }}
                    />

                    <CopyToClipboard text={copyToShare}>
                        <FaWhatsappSquare size={30} className="text-success"
                            onClick={() => alert("Copied to share on whatsapp")}
                        />
                    </CopyToClipboard>

                    <MdReadMore size={35} className="text-primary"
                        onClick={() => { navigate(`/customer/${id}`) }}
                    />
                </div>

                <hr />
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
    )
}

export default CustomerCard