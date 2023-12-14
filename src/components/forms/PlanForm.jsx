import { useEffect, useRef } from "react"
import { Button, Container, FormGroup } from "react-bootstrap"
import { Form } from "react-bootstrap"
import { createPlan, readPlans } from "../../crudAPIs/plansAPIs";
import { useSelector } from "react-redux";

// This component used by pages/PlansPage.js
// This component shows plan details
const PlanForm = ({ props }) => {
    const { setAddPlan } = props;

    const planForm = useRef();
    const plansData = useRef();

    const scrutinizedUser = useSelector(state => state.scrutinyUserReducer);

    useEffect(() => {
        readPlans(scrutinizedUser)
            .then((plans) => {
                plansData.current = plans;
            })
            .catch((err) => {
                console.warn(err);
            })
    }, []);

    const handleSearch = (planName) => {
        return plansData.current.filter((plan) =>
            plan.PlanName.toLowerCase().includes(planName.toLowerCase())
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const { PlanName, MRP, LCOPrice, BCPrice, SDCount, HDCount, CustomMRP } = planForm.current;
        const planData = {
            PlanName: PlanName.value,
            MRP: MRP.value,
            LCOPrice: LCOPrice.value,
            BCPrice: BCPrice.value,
            SDCount: SDCount.value,
            HDCount: HDCount.value,
            CustomMRP: CustomMRP.value
        };

        if (handleSearch(PlanName.value).length > 0) {
            alert(`${PlanName.value} plan already exist`)
            return
        };

        createPlan(scrutinizedUser, planData)
            .then(res => {
                alert(res.message);
                setAddPlan(false);
            })
            .catch(err => {
                alert(err);
            })
    }

    return (
        <Container className="shadow rounded p-2">
            <div className="d-flex flex-column">
                <Button variant="danger" size="sm" className="mb-1 align-self-end rounded-5"
                    onClick={() => setAddPlan(false)}
                >X</Button>
            </div>
            <Form ref={planForm} onSubmit={handleSubmit}>
                <Form.Floating className="mb-1">
                    <Form.Control name="PlanName" required />
                    <Form.Label>Plan Name</Form.Label>
                </Form.Floating>

                <FormGroup className="d-flex">
                    <Form.Floating>
                        <Form.Control name="MRP" required />
                        <Form.Label>MRP</Form.Label>
                    </Form.Floating>

                    <Form.Floating>
                        <Form.Control name="LCOPrice" required />
                        <Form.Label>LCO Price</Form.Label>
                    </Form.Floating>

                    <Form.Floating>
                        <Form.Control name="BCPrice" required />
                        <Form.Label>BC Price</Form.Label>
                    </Form.Floating>

                    <Form.Floating>
                        <Form.Control name="SDCount" required />
                        <Form.Label>SD Count</Form.Label>
                    </Form.Floating>

                    <Form.Floating>
                        <Form.Control name="HDCount" required />
                        <Form.Label>HD Count</Form.Label>
                    </Form.Floating>

                    <Form.Floating>
                        <Form.Control name="CustomMRP" required />
                        <Form.Label>Custom MRP</Form.Label>
                    </Form.Floating>
                    <Button variant="success" type="submit" >Save</Button>
                </FormGroup>
            </Form>
        </Container >
    )
}

export default PlanForm;