import { Form, FormGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const CustomerSection = ({ customer }) => {
    const customerList = useSelector(state => state.customersReducer).data;

    const {
        date, name, area, address, mobile
    } = customer;

    const countName = (name) => {
        const names = customerList.filter((customer) => {
            return customer.CustName == name
        });

        console.warn(names.length);
    };

    return (
        <FormGroup className="col border shadow rounded p-3">
            <span className="fw-bold text-secondary">Customer Details</span>

            <Form.Floating className="my-3">
                <Form.Control type="date" placeholder="Date" defaultValue={date} />
                <Form.Label className="text-primary fw-bold">Date</Form.Label>
            </Form.Floating>

            <Form.Floating className="mb-3">
                <Form.Control placeholder="Name" defaultValue={name}
                    onChange={(e) => { countName(e.target.value) }}
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
                <Form.Control placeholder="Area" defaultValue={area} />
                <Form.Label className="text-primary fw-bold">Area</Form.Label>
            </Form.Floating>

            <Form.Floating className="mb-3">
                <Form.Control placeholder="Address" defaultValue={address} />
                <Form.Label className="text-primary fw-bold">Address</Form.Label>
            </Form.Floating>

            <Form.Floating className="mb-3">
                <Form.Control placeholder="Mobile" defaultValue={mobile} />
                <Form.Label className="text-primary fw-bold">Mobile</Form.Label>
            </Form.Floating>
        </FormGroup>
    )
}

export default CustomerSection