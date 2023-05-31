import { Form, FormGroup } from "react-bootstrap";

const STBSection = ({ stb }) => {
    const {
        status, state, stbs,
        sdHd, acNo, stb_SN,
        nds_No, vc_Nds_Mac_ID, lcoCode
    } = stb;

    return (
        <FormGroup className="col border shadow rounded p-3">
            <span className="fw-bold text-secondary"> STB Details </span>

            {status &&
                <div className="d-flex justify-content-evenly mt-3">
                    <Form.Floating className="mb-3">
                        <Form.Select placeholder="STB Status" defaultValue={status} >
                            <option>Select</option>
                            <option>ACTIVE</option>
                            <option>SUSPEND</option>
                            <option>DISCONNECT</option>
                        </Form.Select>
                        <Form.Label className="text-primary fw-bold">STB Status</Form.Label>
                    </Form.Floating>

                    <Form.Floating className="mb-3">
                        <Form.Select placeholder="STB State" defaultValue={state} >
                            <option>Select</option>
                            <option>Allocated</option>
                            <option>Faulty</option>
                            <option>Good</option>
                            <option>Return</option>
                        </Form.Select>
                        <Form.Label className="text-primary fw-bold">STB State</Form.Label>
                    </Form.Floating>
                </div>
            }

            <div className="d-flex justify-content-evenly">
                {stbs &&
                    <Form.Floating className="col-3 mb-3">
                        <Form.Control placeholder="STBs" defaultValue={stbs} />
                        <Form.Label className="text-primary fw-bold">STBs</Form.Label>
                    </Form.Floating>
                }

                <Form.Floating className="col-4 mb-3">
                    <Form.Select placeholder="SD/HD" defaultValue={sdHd} >
                        <option>Select</option>
                        <option>SD</option>
                        <option>HD</option>
                        <option>HD Jio</option>
                    </Form.Select>
                    <Form.Label className="text-primary fw-bold">SD/HD</Form.Label>
                </Form.Floating>

                <Form.Floating className="col-5 mb-3">
                    <Form.Control placeholder="A/c No" defaultValue={acNo} />
                    <Form.Label className="text-primary fw-bold">A/c No</Form.Label>
                </Form.Floating>
            </div>

            <Form.Floating className="mb-3">
                <Form.Control placeholder="STB Sr No" defaultValue={stb_SN} />
                <Form.Label className="text-primary fw-bold">STB Sr No</Form.Label>
            </Form.Floating>

            <Form.Floating className="mb-3">
                <Form.Control placeholder="NDS No" defaultValue={nds_No} />
                <Form.Label className="text-primary fw-bold">NDS No</Form.Label>
            </Form.Floating>

            <div className="d-flex justify-content-evenly">
                <Form.Floating className="mb-3">
                    <Form.Control placeholder="VC/NDS/MAC ID" defaultValue={vc_Nds_Mac_ID} />
                    <Form.Label className="text-primary fw-bold">VC/NDS/MAC ID</Form.Label>
                </Form.Floating>

                <Form.Floating className="mb-3">
                    <Form.Control placeholder="LCO Code" defaultValue={lcoCode} />
                    <Form.Label className="text-primary fw-bold">LCO Code</Form.Label>
                </Form.Floating>
            </div>
        </FormGroup>
    )
}

export default STBSection