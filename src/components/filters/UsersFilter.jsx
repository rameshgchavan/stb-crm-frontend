import { Button, ButtonGroup, Container, Form, FormGroup } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { setUserStatusAction, searchUserAction } from "../../redux/actions";
import { useRef } from "react";

const UsersFilter = () => {
    const dispatch = useDispatch();
    const userName = useRef();

    return (
        <Container className="bg-secondary shadow rounded-bottom">
            <Form className="d-md-flex justify-content-around py-1">
                <ButtonGroup size="sm">
                    <Button variant="warning"
                        onClick={() => { dispatch(setUserStatusAction("pending")) }}
                    >Pending</Button>

                    <Button variant="success"
                        onClick={() => { dispatch(setUserStatusAction("approved")) }}
                    >Approved</Button>

                    <Button variant="danger"
                        onClick={() => { dispatch(setUserStatusAction("blocked")) }}
                    >Blocked</Button>
                </ButtonGroup>

                <FormGroup className="d-flex mt-xl-0 mt-1">
                    <Form.Control type="text"
                        onChange={(e) => { userName.current = e.target.value }}
                    />

                    <Button className="ms-2"
                        onClick={() => { dispatch(searchUserAction(userName.current)) }}
                    >Search</Button>
                </FormGroup>
            </Form>
        </Container>
    )
}

export default UsersFilter