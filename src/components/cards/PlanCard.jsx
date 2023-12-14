import { useEffect, useState } from "react"
import { Button, Container, FormGroup } from "react-bootstrap"
import { Form } from "react-bootstrap"
import { updatePlan } from "../../crudAPIs/plansAPIs";
import { useSelector } from "react-redux";

// This component used by pages/PlansPage.js
// This component shows plan details
const PlanCard = ({ index, plans }) => {
    const scrutinizedUser = useSelector(state => state.scrutinyUserReducer);

    const [customMRP, setCustomMRP] = useState(plans?.CustomMRP);

    useEffect(() => {
        setCustomMRP(plans.CustomMRP);
    }, [plans?.CustomMRP])

    const handleUpdate = () => {
        const planData = {
            CustomMRP: customMRP
        };

        updatePlan(scrutinizedUser, plans?.PlanName, planData)
            .then(res => {
                alert(res.message);
            })
            .catch(err => {
                alert(err);
            });
    };

    return (
        <Container className="shadow rounded p-2 mb-3">
            <Form.Floating className="mb-1">
                <Form.Control id={`planName${index}`} disabled value={plans?.PlanName} />
                <Form.Label>Plan Name</Form.Label>
            </Form.Floating>

            <FormGroup className="d-flex">
                <Form.Floating>
                    <Form.Control id={`mrp${index}`} disabled value={plans?.MRP} />
                    <Form.Label>MRP</Form.Label>
                </Form.Floating>

                <Form.Floating>
                    <Form.Control id={`lcoPrice${index}`} disabled value={plans?.LCOPrice} />
                    <Form.Label>LCO Price</Form.Label>
                </Form.Floating>

                <Form.Floating>
                    <Form.Control id={`bcPrice${index}`} disabled value={plans?.BCPrice} />
                    <Form.Label>BC Price</Form.Label>
                </Form.Floating>

                <Form.Floating>
                    <Form.Control id={`sdCount${index}`} disabled value={plans?.SDCount} />
                    <Form.Label>SD Count</Form.Label>
                </Form.Floating>

                <Form.Floating>
                    <Form.Control id={`hdCount${index}`} disabled value={plans?.HDCount} />
                    <Form.Label>HD Count</Form.Label>
                </Form.Floating>

                <Form.Floating>
                    <Form.Control id={`customMRP${index}`} value={customMRP}
                        onChange={(e) => { setCustomMRP(e.target.value) }}
                    />
                    <Form.Label>Custom MRP</Form.Label>
                </Form.Floating>
                <Button variant="warning"
                    onClick={handleUpdate}
                >Update</Button>
            </FormGroup>
        </Container >
    )
}

export default PlanCard;