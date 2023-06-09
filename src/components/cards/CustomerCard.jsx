import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

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

    return (
        <Form >
            <Form.Group className="border rounded shadow px-3 py-2 mb-3" style={{ width: "20rem" }}>
                <Form.Label className="d-flex justify-content-between fw-bold">
                    <div className="fs-6 fw-bold text-start">{srNo}.</div>
                    <div className="fs-6 fw-bold text-start">A/c:{acNo}</div>
                    {status == "ACTIVE" ? <div className="fs-6 fw-bold text-lowercase text-success text-start">{status}</div>
                        : <div className="fs-6 fw-bold text-lowercase text-danger text-start">{status}</div>}
                </Form.Label>

                <Form.Label className="d-block text-uppercase fw-bold text-primary text-truncate">{name}</Form.Label>
                <Form.Label className="d-block text-truncate">{area}, {address}.<br /> Mobile: {mobile}</Form.Label>

                <Form.Label className="d-flex fw-bold justify-content-between">
                    <div className="fs-6 fw-bold">LCO:{lcoCode}</div>
                    <div className="fs-6 fw-bold text-primary">ID:{vcNdsMacId}</div>
                </Form.Label>

                <div className="d-flex justify-content-between">
                    <Button variant="warning" size="sm"
                        onClick={() => { navigate(`/package/${acNo}/${DateTime.now().minus({ months: 1 }).toFormat("LLL-yyyy")}`) }}
                    >Pack</Button>
                    <Button size="sm"
                        onClick={() => { navigate(`/customer/${id}`) }}
                    >more...</Button>
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