import { useState } from "react";
import { Form, FormGroup } from "react-bootstrap";

const STBSection = ({ stb }) => {
    const {
        status, state, location,
        type, sdHd,
        stbs, acNo, stb_SN,
        nds_No, vc_Nds_Mac_ID, lcoCode
    } = stb;

    const statusOptions = {
        ACTIVE: ["", "Allocated"],
        SUSPEND: ["", "Allocated", "Faulty", "Return"],
        DISCONNECT: ["", "Faulty", "Good", "Return"],
    }

    const typeOptions = [
        "", "NEW", "REPAIRED", "SAME-LINE",
        "SAME-CITY", "OUT-LINE", "OUT-CITY",
        "OUT-DIST", "OUT-STATE"
    ]

    const locationOptions = ["LEFTOUT", "OUTGONE"]

    const [selectedStatus, setSelectedStatus] = useState(status);
    const [selectedType, setSelectedType] = useState(type);
    const [selectedState, setSelectedState] = useState(state || "Allocated");

    return (
        <FormGroup className="col border shadow rounded p-3">
            <span className="fw-bold text-secondary"> STB Details </span>
            {status &&
                <div className="d-flex justify-content-evenly mt-3">
                    <Form.Floating className="col-5 mb-3">
                        <Form.Select name="status" placeholder="STB Status"
                            onChange={(e) => { setSelectedStatus(e.target.value) }}
                            defaultValue={status} required>
                            <option></option>
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="SUSPEND">SUSPEND</option>
                            <option value="DISCONNECT">DISCONNECT</option>
                        </Form.Select>
                        <Form.Label className="text-primary fw-bold">STB Status</Form.Label>
                    </Form.Floating>

                    <Form.Floating className="col-5 mb-3">
                        <Form.Select name="state" placeholder="STB State"
                            onChange={(e) => { setSelectedState(e.target.value) }}
                            defaultValue={state} required>

                            {
                                statusOptions[selectedStatus]?.map(status => {
                                    return <option value={status}>{status}</option>
                                })
                            }
                        </Form.Select>
                        <Form.Label className="text-primary fw-bold">STB State</Form.Label>
                    </Form.Floating>
                </div>
            }

            <div className="d-flex justify-content-evenly mt-3">
                <Form.Floating className="col-5 mb-3">
                    <Form.Select name="type" placeholder="STB Type"
                        onChange={(e) => { setSelectedType(e.target.value) }}
                        defaultValue={type} required >

                        {typeOptions.map(type => {
                            return <option value={type}>{type}</option>
                        })}
                    </Form.Select>
                    <Form.Label className="text-primary fw-bold">STB Type</Form.Label>
                </Form.Floating>

                <Form.Floating className="col-5 mb-3">
                    <Form.Select name="location" placeholder="Location"
                        defaultValue={location} required>

                        {selectedState == "Good" ?
                            locationOptions.map(locOp => {
                                return <option>{locOp}</option>
                            })
                            :
                            selectedType == "NEW" || selectedType == "REPAIRED" ?
                                <option>INLINE</option>
                                :
                                selectedType ?
                                    <option>CAMEIN</option>
                                    : ""
                        }
                    </Form.Select>
                    <Form.Label className="text-primary fw-bold">Location</Form.Label>
                </Form.Floating>
            </div>

            <div className="d-flex justify-content-evenly">
                {stbs &&
                    <Form.Floating className="col-3 mb-3">
                        <Form.Control name="stbs" placeholder="STBs" defaultValue={stbs} disabled />
                        <Form.Label className="text-primary fw-bold">STBs</Form.Label>
                    </Form.Floating>
                }
                
                <Form.Floating className="col-8 mb-3">
                    <Form.Control name="acNo" placeholder="A/c No" defaultValue={acNo}
                        required maxLength={10} minLength={10} autocomplete="off" />
                    <Form.Label className="text-primary fw-bold">A/c No</Form.Label>
                </Form.Floating>
            </div>

            <div className="d-flex justify-content-evenly">
                <Form.Floating className="col-3 mb-3">
                    <Form.Select name="sdHd" placeholder="SD/HD" defaultValue={sdHd} required>
                        <option></option>
                        <option>SD</option>
                        <option>HD</option>
                        <option>HD Jio</option>
                    </Form.Select>
                    <Form.Label className="text-primary fw-bold">SD/HD</Form.Label>
                </Form.Floating>
                <Form.Floating className="col-8 mb-3">
                    <Form.Control name="stbSrNo" placeholder="STB Sr No" defaultValue={stb_SN}
                        required minLength={16} autocomplete="off" />
                    <Form.Label className="text-primary fw-bold">STB Sr No</Form.Label>
                </Form.Floating>
            </div>

            <Form.Floating className="mb-3">
                <Form.Control name="ndsNo" placeholder="NDS No" defaultValue={nds_No}
                    required minLength={16} autocomplete="off" />
                <Form.Label className="text-primary fw-bold">NDS No</Form.Label>
            </Form.Floating>

            <div className="d-flex justify-content-evenly">
                <Form.Floating className="col-5 mb-3">
                    <Form.Control name="vcNdsMacID" placeholder="VC/NDS/MAC ID" defaultValue={vc_Nds_Mac_ID}
                        required minLength={10} autocomplete="off" />
                    <Form.Label className="text-primary fw-bold">VC/NDS/MAC ID</Form.Label>
                </Form.Floating>

                <Form.Floating className="col-5 mb-3">
                    <Form.Control name="lcoCode" placeholder="LCO Code" defaultValue={lcoCode}
                        required maxLength={10} minLength={10} autocomplete="off" />
                    <Form.Label className="text-primary fw-bold">LCO Code</Form.Label>
                </Form.Floating>
            </div>
        </FormGroup>
    )
}

export default STBSection