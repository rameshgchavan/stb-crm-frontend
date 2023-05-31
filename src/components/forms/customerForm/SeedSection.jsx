import { Form, FormGroup } from "react-bootstrap";

const SeedSection = ({ seed }) => {
    const {
        location,
        type,
        origin,
        areaPerson,
        areaManager,
        remark
    } = seed;

    return (
        <FormGroup className="col border shadow rounded p-3">
            <span className="fw-bold text-secondary">Seed Info</span>

            <div className="d-flex justify-content-evenly mt-3">
                {location &&
                    <Form.Floating className="col-6 mb-3">
                        <Form.Select placeholder="Location" defaultValue={location} >
                            <option>Select</option>
                            <option>INLINE</option>
                            <option>CAMEIN</option>
                            <option>LEFTOUT</option>
                            <option>OUTGONE</option>
                        </Form.Select>
                        <Form.Label className="text-primary fw-bold">Location</Form.Label>
                    </Form.Floating>
                }

                <Form.Floating className="col-6 mb-3">
                    <Form.Select placeholder="Seed Type" defaultValue={type} >
                        <option>Select</option>
                        <option>NEW</option>
                        <option>REPAIRED</option>
                        <option>SAME-LINE</option>
                        <option>SAME-CITY</option>
                        <option>OUT-LINE</option>
                        <option>OUT-CITY</option>
                        <option>OUT-DIST</option>
                        <option>OUT-STATE</option>
                    </Form.Select>
                    <Form.Label className="text-primary fw-bold">Seed Type</Form.Label>
                </Form.Floating>
            </div>

            <Form.Floating className="mb-3">
                <Form.Select placeholder="Origin" defaultValue={origin} >
                    <option>Select</option>
                    <option>Hingoli Store</option>
                    <option>Aurangabad Store</option>
                </Form.Select>
                <Form.Label className="text-primary fw-bold">Origin</Form.Label>
            </Form.Floating>

            <Form.Floating className="mb-3">
                <Form.Select placeholder="Area/ Person" defaultValue={areaPerson} >
                    <option>Select</option>
                    <option>Ajam Colony</option>
                    <option>Balu Chakke</option>
                    <option>Khwaja Mohammadiya Colony, Shivraj Nagar</option>
                    <option>Hingoli Office Staff</option>
                    <option>Madhav Bangar</option>
                    <option>N P Colony</option>
                    <option>Naik Nagar, NTC</option>
                    <option>Nandalal Sahu</option>
                    <option>Rajesh Chavan</option>
                    <option>Risala</option>
                    <option>Sanjay Ghawad</option>
                    <option>Santosh Afune</option>
                    <option>Sharad Jogdand</option>
                    <option>SRPF Quarter</option>
                    <option>Tofkhana</option>
                </Form.Select>
                <Form.Label className="text-primary fw-bold">Area/ Person</Form.Label>
            </Form.Floating>

            <Form.Floating className="mb-3">
                <Form.Select placeholder="Area Manager" defaultValue={areaManager} >
                    <option>Select</option>
                    <option>Balu Chakke</option>
                    <option>Madhav Bangar</option>
                    <option>Prakash Mujmule</option>
                    <option>Rajesh Chavan</option>
                    <option>Sanjay Ghawad</option>
                    <option>Santosh Afune</option>
                    <option>Sharad Jogdand</option>
                </Form.Select>
                <Form.Label className="text-primary fw-bold">Area Manager</Form.Label>
            </Form.Floating>

            <Form.Floating className="mb-3">
                <Form.Control placeholder="Remark" defaultValue={remark} />
                <Form.Label className="text-primary fw-bold">Remark</Form.Label>
            </Form.Floating>
        </FormGroup>
    )
}

export default SeedSection