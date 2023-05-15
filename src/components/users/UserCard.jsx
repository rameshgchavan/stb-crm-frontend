import { useRef } from "react";
import { Button, ButtonGroup, Container, Form } from "react-bootstrap"

const UserCard = ({ userInfo }) => {
    const { user, status } = userInfo;
    const userName = useRef(user.Name);

    return (
        <Container >
            <Form >
                <Form.Group className="d-sm-flex border rounded shadow px-3 py-2 justify-content-between align-items-end">
                    <Form.Group className="d-flex align-items-end mb-sm-0 mb-2">
                        <Form.Group className="me-2">
                            <Form.Text>User Name</Form.Text>
                            <Form.Control type="text" defaultValue={userName.current} />
                        </Form.Group>

                        {status == "approved" && <Button variant="primary" className="me-3">Rename</Button>}
                    </Form.Group>
                    <ButtonGroup >
                        {status != "approved" && <Button variant="success">Approve</Button>}
                        {status != "blocked" && <Button variant="danger">Block</Button>}
                    </ButtonGroup>

                </Form.Group>
            </Form>
        </Container >
    )
}

export default UserCard