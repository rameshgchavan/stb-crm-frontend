import { Button, Container, Form, FormGroup } from "react-bootstrap";
import PlansCard from "../components/cards/PlanCard";
import { useEffect, useRef, useState } from "react";
import { readPlans } from "../crudAPIs/plansAPIs";
import { useSelector } from "react-redux";
import PlanForm from "../components/forms/PlanForm";

// This page used by routes/PagesRoutes
// This page shows plan components
const PlansPage = () => {
    const scrutinizedUser = useSelector(state => state.scrutinyUserReducer);
    const [plans, setPlans] = useState();
    const [addPlan, setAddPlan] = useState(false);
    const plansData = useRef();
    const searchedName = useRef();

    useEffect(() => {
        readPlans(scrutinizedUser)
            .then((plans) => {
                plansData.current = plans;
                setPlans(plans);
            })
            .catch((err) => {
                console.warn(err);
            })
    }, []);

    const handleSearch = (planName) => {
        const filteredPlans = plansData.current.filter((plan) =>
            plan.PlanName.toLowerCase().includes(planName.toLowerCase())
        );
        setPlans(filteredPlans);
    }

    return (
        <div>
            <Container className="mb-3">
                <Form>
                    {/* Type and search */}
                    <FormGroup size="sm" className="d-flex mt-xl-0 mt-1 align-items-start">
                        <Form.Control type="text"
                            placeholder="Type and search"
                            onChange={(e) => searchedName.current = e.target.value} />
                        <Button className="ms-2"
                            onClick={() => handleSearch(searchedName.current)}
                        >Search</Button>
                    </FormGroup>
                </Form>
            </Container>

            {!addPlan &&
                <Button className="mt-3"
                    onClick={() => setAddPlan(true)}
                >Add New</Button>
            }

            {addPlan && <PlanForm props={{ setAddPlan }} />}

            {!plans
                ? <h3>Loading...</h3>
                : plans?.map((plan, index) => <PlansCard key={index} index={index} plans={plan} />)
            }
        </div>
    )
}

export default PlansPage;