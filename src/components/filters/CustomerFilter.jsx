import { Button, ButtonGroup, Container, Form, FormGroup } from "react-bootstrap"

const CustomerFilter = () => {
    return (
        <Container className="bg-secondary shadow rounded-bottom">
            <Form className="d-md-flex justify-content-around py-1">
                <ButtonGroup size="sm">
                    <Button variant="success">INLINE</Button>
                    <Button variant="warning">LEFTOUT</Button>
                    <Button variant="danger">OUTGONE</Button>
                    <Button variant="primary">OTHER</Button>
                </ButtonGroup>

                <FormGroup className="d-flex mt-xl-0 mt-1">
                    <Form.Control type="text" />
                    <Button className="ms-2">Search</Button>
                </FormGroup>
            </Form>
        </Container>
    )
}

export default CustomerFilter