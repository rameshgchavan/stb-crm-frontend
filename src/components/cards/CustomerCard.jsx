import { useRef } from "react";
import { Button, ButtonGroup, Container, Form } from "react-bootstrap"

const CustomerCard = ({ customer, stb, seed }) => {
    const name = useRef(customer.Name);
    const mobile = useRef(customer.Mobile);
    const area = useRef(customer.Area);
    const address = useRef(customer.Address);

    const stbDate = useRef(stb.STB_Date);
    const stbs = useRef(stb.STBs);
    const state = useRef(stb.State);
    const status = useRef(stb.Status);
    const type = useRef(stb.Type);
    const sdhd = useRef(stb.SDHD);
    const nds = useRef(stb.NDS);
    const stbSr = useRef(stb.STB_SR);
    const vcNdsMacId = useRef(stb.VCNDSMAC_ID);
    const acNo = useRef(stb.AcNo);
    const lcoCode = useRef(stb.LCO_Code);

    const location = useRef(seed.Location);
    const origin = useRef(seed.Origin);
    const areaPerson = useRef(seed.Area_Person);
    const areaManager = useRef(seed.Area_Manager);

    return (
        <Container className="d-lg-flex justify-content-between align-items-start border rounded shadow mb-3 py-2">
            <Form className="d-lg-flex">
                <Form.Group className="border px-3 py-2 justify-content-between align-items-end">
                    <Form.Label className="d-block">{name.current}</Form.Label>
                    <Form.Label className="d-block">{area.current} {address.current}</Form.Label>
                    <Form.Label className="d-block">Mobile: {mobile.current}</Form.Label>
                </Form.Group>

                <Form.Group className="border px-3 py-2 justify-content-between align-items-end">
                    <Form.Label className="d-block"> {status.current} {acNo.current}</Form.Label>
                    <Form.Label className="d-block">LCO: {lcoCode.current} ID: {vcNdsMacId.current}</Form.Label>
                    <Form.Label className="d-block">STB Date: {stbDate.current}</Form.Label>
                    <Form.Label className="d-block"> {type.current} STBs: {stbs.current} {sdhd.current} {stbSr.current}</Form.Label>
                    <Form.Label className="d-block"> {state.current} {nds.current}</Form.Label>
                </Form.Group>

                <Form.Group className="border px-3 py-2 justify-content-between align-items-end">
                    <Form.Label className="d-block">Location: {location.current}</Form.Label>
                    <Form.Label className="d-block">Origin: {origin.current}</Form.Label>
                    <Form.Label className="d-block">Area/ Person: {areaPerson.current}</Form.Label>
                    <Form.Label className="d-block">Area Manager: {areaManager.current}</Form.Label>
                </Form.Group>
            </Form>
            
            <ButtonGroup className="mt-lg-0 mt-2">
                <Button variant="warning" >Edit</Button>
                <Button>View Package</Button>
            </ButtonGroup>
        </Container >
    )
}

export default CustomerCard