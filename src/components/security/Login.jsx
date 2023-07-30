import { Container, Button, Form, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

import { useDispatch } from 'react-redux';

// Import axios
import axios from "axios";

// Import actions from redux/actions folder
import { authenticateUserAction } from "../../redux/actions"


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

        if (user.data.code === 404) {
            alert("Email ID not matching or not registered")
            return
        }

        if (user.data.code === 403) {
            alert("Password not matching, please check again.")
            return
        }

        if (user.data.code === 102) {
            alert("Wait for approval or contact to authority.")
            return
        }

        if (user.data.code === 401) {
            alert("You have been blocked.")
            return
        }

        const filterSetting = JSON.parse(localStorage.getItem("FilterSetting"));

        const resetSetting = {
            ...filterSetting,
            custAreaPerson: "All",
            custAreaManager: "All",
            custLocation: "INLINE",
            transAreaPerson: "All",
            transAreaManager: "All",
            transDay: "All",
        }

        localStorage.setItem("FilterSetting", JSON.stringify(resetSetting));

        dispatch(authenticateUserAction(user.data))
        navigate("/customers")
    }

    return (
        <Container style={{ width: "22rem" }} className='border p-4 shadow' >
            <Form onSubmit={handleLogin}>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>

                <Form.Floating className="mb-4">
                    <Form.Control name="email" type="email" placeholder="Enter email" required
                        onChange={(e) => emailID.current = e.target.value}
                    />
                    <Form.Label className="text-primary fw-bold">Enter email</Form.Label>
                </Form.Floating>

                <Form.Floating className="mb-4">
                    <Form.Control name="password" type="password" placeholder="Enter password" required
                        onChange={(e) => password.current = e.target.value}
                    />
                    <Form.Label className="text-primary fw-bold">Enter password</Form.Label>
                </Form.Floating>

                <Button variant="primary" type="submit" >
                    Login
                </Button>
            </Form>

            <Nav className='d-flex flex-column align-items-center mt-4'>
                <Nav.Link onClick={() => navigate("/forgotpass")}>Forgot password</Nav.Link>
            </Nav>

            <hr />
            <div>
                Use following IDs to test this application<br />

                <b>Admin ID:</b><br />
                demoadmin@gmail.com<br />
                <b>Admin's User IDs:</b> <br />
                demouser1@gmail.com<br />
                demouser2@gmail.com<br />
                <br />
                <b> All IDs password:</b> Demo@123
            </div>
        </Container>
    )
}

export default Login