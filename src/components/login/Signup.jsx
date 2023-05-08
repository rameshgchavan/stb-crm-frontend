import { Container, Button, Form } from 'react-bootstrap';

// Import axios
import axios from "axios";

// Import actions from redux/actions folder
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const Signup = () => {
    const userName = useRef(null);
    const emailID = useRef(null);
    const password = useRef(null);
    const confirmPassword = useRef(null);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (password.current !== confirmPassword.current) {
            alert("Password not matching, try again.")
            return
        }

        const userDetails = {
            Admin: false,
            Approved: false,
            Name: userName.current,
            AreaManager: userName.current,
            Email: emailID.current,
            Password: password.current,
            LastLogin: ""
        }

        const user = await axios("/users/signup", {
            method: "post",
            data: userDetails
        })

        user.data.code === 201
            ? alert(`${user.data.message} Wait for approval or contact to authority.`)
            : user.data.code === 409
                ? alert(`${user.data.message} Try another one.`)
                : alert(user.data);

        user.data.code === 201
            ? navigate("/")
            : navigate("/signup")

    }

    return (
        <Container style={{ width: "22rem" }} className='border p-4 shadow' >
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicUserName">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter user name" required
                        onChange={(e) => userName.current = e.target.value} />
                </Form.Group>

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

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" required
                        onChange={(e) => confirmPassword.current = e.target.value} />
                </Form.Group>

                <Button variant="primary" type="submit" >
                    Signup
                </Button>
            </Form>
        </Container>
    )
}

export default Signup