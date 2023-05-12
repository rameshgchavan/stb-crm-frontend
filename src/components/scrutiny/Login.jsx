import { Container, Button, Form, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

import { useDispatch } from 'react-redux';

// Import axios
import axios from "axios";

// Import actions from redux/actions folder
import { authenticateUser } from "../../redux/actions"


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
            Password: password.current.toString()
        }

        const user = await axios("/users/login", {
            method: "post",
            data: crediantials
        })

        if (user.data.code == 404) {
            alert("Email ID not matching or not registered")
            return
        }

        if (user.data.code == 403) {
            alert("Password not matching, please check again.")
            return
        }

        dispatch(authenticateUser(user.data))

        user.data.Approved
            ? navigate("/customers")
            : alert("Wait for approval or contact to authority")

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
                    <Form.Control type="email" placeholder="Enter email" required
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

            <Nav className='d-flex flex-column align-items-center mt-4'>
                <Nav.Link onClick={() => navigate("/forgotpass")}>Forgot password</Nav.Link>
            </Nav>
        </Container>
    )
}

export default Login