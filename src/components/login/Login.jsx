import { Container, Button, Form } from 'react-bootstrap';

// Import redux methods
// import { useSelector, useDispatch } from "react-redux";

// Import actions from redux/actions folder
// import { authenticateUser } from "../../redux/actions"

const Login = () => {
    // Create object of useDispatch method
    // const dispatch = useDispatch();

    const handleLogin = () => {
        const crediantials = {
            Email: "admin",
            Password: "123"
        }
        // Call actions with data
        // dispatch(authenticateUser(crediantials));
    }

    // // Get user details
    // const user = useSelector(state => state.userReducer)

    // console.warn(user);

    return (
        <Container style={{ width: "22rem" }} className='border px-2 py-4 shadow' >
            <Form >
                {/* <Col sm={6} md={5} lg={4} xl={4}> */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" />
                </Form.Group>

                <Button variant="primary" type="button" onClick={handleLogin}>
                    Login
                </Button>
                {/* </Col> */}
            </Form>
        </Container>
    )
}

export default Login