import { Container, Button, Form } from 'react-bootstrap';

import { useDispatch } from 'react-redux';

// Import axios
import axios from "axios";

// Import actions from redux/actions folder
import { authenticateUser } from "../../redux/actions"
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const Login = () => {
    const emailID = useRef(null);
    const password = useRef(null);

    const navigate = useNavigate();

    // Create object of useDispatch method
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();

        const crediantials = {
            Email: emailID.current,
            Password: password.current
        }

        const user = await axios("/users/login", {
            method: "post",
            data: crediantials
        })

        dispatch(authenticateUser(user.data))

        user.data
            ? user.data.Approved
                ? navigate("/customers")
                : alert("Wait for approval or contact to authority")
            : alert("Check Email ID or password")

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
        <Container style={{ width: "22rem" }} className='border p-4 shadow' >
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" required
                        onChange={(e) => emailID.current = e.target.value} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" required
                        onChange={(e) => password.current = e.target.value} />
                </Form.Group>

                <Button variant="primary" type="submit" >
                    Login
                </Button>
            </Form>
        </Container>
    )
}

export default Login