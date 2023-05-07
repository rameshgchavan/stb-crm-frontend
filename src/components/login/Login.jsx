import { Container, Button, Form } from 'react-bootstrap';

// Import axios
import axios from "axios";

// Import redux methods
import { useSelector, useDispatch } from "react-redux";

// Import actions from redux/actions folder
import { authenticateUser } from "../../redux/actions"

const Login = () => {
    // // Get user details
    const user = useSelector(reducers => reducers.usersReducer)

    // Create object of useDispatch method
    const dispatch = useDispatch();

    const handleLogin = async () => {
        const crediantials = {
            Email: "admin",
            Password: "123"
        }

        const user1 = await axios("/users/login", {
            method: "post",
            data: crediantials
        })

        dispatch(authenticateUser(user1.data))

        // await axios("/users/login", {
        //     method: "post",
        //     data: crediantials
        // }).then(res => {
        //     // Call actions with data
        //     dispatch(authenticateUser(res.data))
        // }).catch(err => {
        //     console.warn(err);
        // });
    }

    return (
        <Container style={{ width: "22rem" }} className='border px-2 py-4 shadow' >
            <Form >
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
                <p>{JSON.stringify(user.Name)}</p>
            </Form>
        </Container>
    )
}

export default Login