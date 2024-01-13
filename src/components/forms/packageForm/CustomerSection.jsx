import { Form, FormGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

// This component used by packegeForm/index.js
// This component is part of package form and holds customer details
const CustomerSection = ({ customer }) => {
    // Destructure customer details and set aliases
    const {
        AcNo:acNo,CustName:name, Area:area, MobNo:mobile, LCOCode:lcoCode, VC_NDS_MAC_ID:vcNdsMacId
    } = customer;

    return (
        <FormGroup className="border shadow rounded p-3 mb-3">
            <Form.Label className="d-block fs-5 text-uppercase text-primary fw-bold">{name ? name : "N/A"}</Form.Label>

            <Form.Label className="d-block fw-bold">Area: {area ? area : "N/A"}</Form.Label>

            <Form.Label className="d-block fw-bold">Mobile: {mobile ? mobile : "N/A"}</Form.Label>
            <hr />

            <div className="d-sm-flex justify-content-around">
                <Form.Label className="d-block fw-bold">LCO: {lcoCode ? lcoCode : "N/A"}</Form.Label>
                <Form.Label className="d-block fw-bold">ID: {vcNdsMacId ? vcNdsMacId : "N/A"}</Form.Label>
                <Form.Label className="d-block fw-bold">A/c No: {acNo}</Form.Label>
            </div>
        </FormGroup>
    )
}

export default CustomerSection