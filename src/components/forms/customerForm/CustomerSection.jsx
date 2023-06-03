import { Form, FormGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const CustomerSection = ({ customer }) => {
    const customerList = useSelector(state => state.customersReducer).data;

    const {
        date, name, area, address, mobile
    } = customer;

    return (
        <FormGroup className="col border shadow rounded p-3">
            <span className="fw-bold text-secondary">Customer Details</span>

            <Form.Floating className="my-3">
                <Form.Control name="date" type="date" placeholder="Date" defaultValue={date} required />
                <Form.Label className="text-primary fw-bold">Date</Form.Label>
            </Form.Floating>

            <Form.Floating className="mb-3">
                <Form.Control name="name" placeholder="Name" defaultValue={name} required
                    list="nameList"
                />
                <datalist id="nameList">
                    {
                        customerList.map((customer, index) => {
                            return (
                                <option> {customer.CustName}</option>
                            )
                        })
                    }
                </datalist>
                <Form.Label className="text-primary fw-bold">Name</Form.Label>
            </Form.Floating>

            <Form.Floating className="mb-3">
                <Form.Control name="area" placeholder="Area" defaultValue={area} required />
                <Form.Label className="text-primary fw-bold">Area</Form.Label>
            </Form.Floating>

            <Form.Floating className="mb-3">
                <Form.Control name="address" placeholder="Address" defaultValue={address} />
                <Form.Label className="text-primary fw-bold">Address</Form.Label>
            </Form.Floating>

            <Form.Floating className="mb-3">
                <Form.Control name="mobile" placeholder="Mobile" defaultValue={mobile} required />
                <Form.Label className="text-primary fw-bold">Mobile</Form.Label>
            </Form.Floating>
        </FormGroup>
    )
}

export default CustomerSection