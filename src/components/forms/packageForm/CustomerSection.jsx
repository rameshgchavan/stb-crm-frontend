import { Form, FormGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const CustomerSection = ({ acNo }) => {
    const customersList = useSelector(state => state.customersListReducer)?.data;

    // Find customer where id matches
    const customer = customersList?.find((customer) => customer.AcNo == acNo);

    const {
        CustName: name, Area: area, Address: address, MobNo: mobile,
        LCOCode: lcoCode, VC_NDS_MAC_ID: vc_Nds_Mac_ID
    } = customer;

    return (
        <FormGroup className="border shadow rounded p-3 mb-3">
            <Form.Label className="d-block fs-5 text-uppercase text-primary fw-bold">{name}</Form.Label>

            <Form.Label className="d-block fw-bold">Area: {area}, {address}</Form.Label>

            <Form.Label className="d-block fw-bold">Mobile: {mobile}</Form.Label>
            <hr />

            <div className="d-sm-flex justify-content-around">
                <Form.Label className="d-block fw-bold">LCO: {lcoCode}</Form.Label>
                <Form.Label className="d-block fw-bold">ID: {vc_Nds_Mac_ID}</Form.Label>
                <Form.Label className="d-block fw-bold">A/c No: {acNo}</Form.Label>
            </div>
        </FormGroup>
    )
}

export default CustomerSection