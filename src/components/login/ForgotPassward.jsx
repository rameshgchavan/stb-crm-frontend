import { Container, Button, Form } from 'react-bootstrap';

// Import axios
import axios from "axios";

// Import actions from redux/actions folder
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const ForgotPassward = () => {
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
        <Container style={{ width: "22rem" }} className='border px-4 pt-2 pb-4 shadow' >
            <div className="d-flex flex-column">
                <Button variant="danger" size='sm'
                    className="flex-direction: column align-self-end rounded"
                    onClick={() => navigate("/")}
                >X</Button>
            </div>
            <hr />
            <Form onSubmit={handleLogin} className='mt-3'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter your registered email id</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required
                        onChange={(e) => emailID.current = e.target.value} />
                    <Button variant="success" type="button" size='sm' className='mt-2' >
                        Send OTP
                    </Button>
                </Form.Group>

                <Form.Group className="my-3" controlId="formBasicOTP">
                    <Form.Text className="text-muted">
                        Check your email for OTP
                    </Form.Text>
                    <Form.Control type="text" placeholder="Enter OTP" required
                        onChange={(e) => userName.current = e.target.value} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter new password" required
                        onChange={(e) => password.current = e.target.value} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" required
                        onChange={(e) => confirmPassword.current = e.target.value} />
                </Form.Group>

                <Button variant="primary" type="submit" >
                    Save
                </Button>
            </Form>
        </Container>
    )
}

export default ForgotPassward