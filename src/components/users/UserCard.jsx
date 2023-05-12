import { Button, ButtonGroup, Container, Form } from "react-bootstrap"

const UserCard = () => {
    return (
        <Container >
            <Form >
                <Form.Group className="d-sm-flex border rounded shadow px-3 py-2 justify-content-between align-items-end">
                    <Form.Group className="d-flex align-items-end mb-sm-0 mb-2">
                        <Form.Group className="me-2">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Button variant="primary" className="me-3">Change</Button>
                    </Form.Group>
                    <ButtonGroup >
                        <Button variant="success">Approve</Button>
                        <Button variant="danger">Block</Button>
                    </ButtonGroup>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default UserCard