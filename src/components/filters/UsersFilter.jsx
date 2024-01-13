import { Button, ButtonGroup, Container, Form, FormGroup } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { addUserStatus } from "../../redux/features/users/usersSlice";
import { useRef } from "react";

/*This component filters users */
// This component is used in routes/FilterRoutes
const UsersFilter = () => {
    const dispatch = useDispatch();
    const userName = useRef();

    return (
        <Container className="bg-secondary shadow rounded-bottom">
            <Form className="d-md-flex justify-content-around py-1">
                {/* Choice buttons */}
                <ButtonGroup size="sm">
                    <Button variant="warning"
                        onClick={() => { dispatch(addUserStatus("pending")) }}
                    >Pending</Button>

                    <Button variant="success"
                        onClick={() => { dispatch(addUserStatus("approved")) }}
                    >Approved</Button>

                    <Button variant="danger"
                        onClick={() => { dispatch(addUserStatus("blocked")) }}
                    >Blocked</Button>
                </ButtonGroup>

                {/* Type and search */}
                <FormGroup className="d-flex mt-xl-0 mt-1">
                    <Form.Control type="text"
                        onChange={(e) => { userName.current = e.target.value }}
                    />

                    <Button className="ms-2"
                    // onClick={() => { dispatch(searchUserAction(userName.current)) }}
                    >Search</Button>
                </FormGroup>
            </Form>
        </Container>
    )
}

export default UsersFilter