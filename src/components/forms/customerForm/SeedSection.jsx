import { Form, FormGroup } from "react-bootstrap";

const SeedSection = ({ seed }) => {
    const {
        origin,
        areaPerson,
        areaManager,
        remark
    } = seed;

    return (
        <FormGroup className="col border shadow rounded p-3">
            <span className="fw-bold text-secondary">Seed Info</span>

            <Form.Floating className="mb-3">
                <Form.Control name="origin" placeholder="Origin"
                    defaultValue={origin} required
                    list="originList" />
                <datalist id="originList">
                    <option>Hingoli Store</option>
                    <option>Aurangabad Store</option>
                </datalist>

                <Form.Label className="text-primary fw-bold">Origin</Form.Label>
            </Form.Floating>

            <Form.Floating className="mb-3">
                <Form.Select name="areaPerson" placeholder="Area || Person" defaultValue={areaPerson} required>
                    <option></option>
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
                <Form.Label className="text-primary fw-bold">Area || Person</Form.Label>
            </Form.Floating>

            <Form.Floating className="mb-3">
                <Form.Select name="areaManager" placeholder="Area Manager" defaultValue={areaManager} required>
                    <option></option>
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
                <Form.Control name="remark" placeholder="Remark" defaultValue={remark} />
                <Form.Label className="text-primary fw-bold">Remark</Form.Label>
            </Form.Floating>
        </FormGroup>
    )
}

export default SeedSection