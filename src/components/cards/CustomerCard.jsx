import { useRef } from "react";
import { Button, Form } from "react-bootstrap"

const CustomerCard = ({ customer, stb }) => {
    const srNo = useRef(customer.SrNo);
    const name = useRef(customer.Name);
    const mobile = useRef(customer.Mobile);
    const area = useRef(customer.Area);
    const address = useRef(customer.Address);

    const status = useRef(stb.Status);
    const vcNdsMacId = useRef(stb.VCNDSMAC_ID);
    const acNo = useRef(stb.AcNo);
    const lcoCode = useRef(stb.LCOCode);

    return (
        <Form >
            <Form.Group className="border rounded shadow px-3 py-2 mb-3" style={{ width: "20rem" }}>
                <Form.Label className="d-flex justify-content-between fw-bold">
                    <div className="fs-6 fw-bold text-start">{srNo.current}.</div>
                    <div className="fs-6 fw-bold text-start">A/c:{acNo.current}</div>
                    {status.current == "ACTIVE" ? <div className="fs-6 fw-bold text-lowercase text-success text-start">{status.current}</div>
                        : <div className="fs-6 fw-bold text-lowercase text-danger text-start">{status.current}</div>}
                </Form.Label>

                <Form.Label className="d-block text-uppercase fw-bold text-primary text-truncate">{name.current}</Form.Label>
                <Form.Label className="d-block text-truncate">{area.current}, {address.current}.<br /> Mobile: {mobile.current}</Form.Label>

                <Form.Label className="d-flex fw-bold justify-content-between">
                    <div className="fs-6 fw-bold">LCO:{lcoCode.current}</div>
                    <div className="fs-6 fw-bold text-primary">ID:{vcNdsMacId.current}</div>
                </Form.Label>

                <div className="d-flex justify-content-between">
                    <Button variant="warning" size="sm">Edit</Button>
                    <Button size="sm">More...</Button>
                </div>
            </Form.Group>
        </Form>
    )
}

export default CustomerCard