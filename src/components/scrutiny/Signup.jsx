import { Container, Button, Form } from 'react-bootstrap';
import emailjs from "@emailjs/browser";
// Import axios
import axios from "axios";

// Import actions from redux/actions folder
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

const Signup = () => {
    const [disabled, setDidsabled] = useState(false);
    const [hidden, setHidden] = useState(true);

    const otpForm = useRef();

    const randomNumber = Math.floor(Math.random() * (1000000 - 1)).toString();
    const emailOTP = useRef(randomNumber);
    const userOTP = useRef(null)
    const userName = useRef(null);
    const emailID = useRef(null);
    const password = useRef(null);
    const confirmPassword = useRef(null);

    const navigate = useNavigate();

    const sendEmail = async (e) => {
        e.preventDefault();

        // const email = otpForm.current["user_email"].value.trim();

        const isEmail = await axios("/users/isemail", {
            method: "post",
            data: { Email: emailID.current.trim() }
        });

        if (isEmail.data.code == 200) {
            alert(`${emailID.current} is already in use, try another one.`)
        }

        else if (isEmail.data.code == 404) {
            // console.warn(emailOTP);

            emailjs.sendForm('service_6bhhezj', 'template_svo2tbq', otpForm.current, 'llSBBJFE7skawlOYO')
                .then((result) => {
                    console.warn(result.text);
                }, (error) => {
                    console.warn(error.text);
                });

            setDidsabled(true);
            setHidden(false);
        }

        else { alert(isEmail) }
    };

    const handleSinup = async (e) => {
        e.preventDefault();

        if (emailOTP.current !== userOTP.current) {
            alert("OTP not matching, check again.")
            return
        }

        if (password.current !== confirmPassword.current) {
            alert("Password not matching, try again.")
            return
        }

        const userDetails = {
            Admin: false,
            Approved: false,
            Name: userName.current,
            AreaManager: userName.current,
            Email: emailID.current.trim(),
            Password: password.current.trim(),
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
            <Form ref={otpForm} onSubmit={sendEmail}>
                <Form.Group className="mb-3" controlId="formBasicUserName">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control name="user_name" type="text" placeholder="Enter user name" required
                        disabled={disabled}
                        onChange={(e) => { userName.current = e.target.value }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    <Form.Control name="user_email" type="email" placeholder="Enter email" required
                        disabled={disabled}
                        onChange={(e) => { emailID.current = e.target.value }} />

                    <input name="email_otp" defaultValue={emailOTP.current} hidden />

                    <Button variant="success" type="submit" size='sm' className='mt-2'
                        disabled={disabled}>
                        Send OTP
                    </Button>
                </Form.Group>
            </Form>

            <Form onSubmit={handleSinup} className='mt-3' hidden={hidden}>
                <Form.Group className="my-3" controlId="formBasicOTP">
                    <Form.Text className="text-muted">
                        Check your email for OTP
                    </Form.Text>
                    <Form.Control type="text" placeholder="Enter OTP" required
                        onChange={(e) => userOTP.current = e.target.value} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Enter password</Form.Label>
                    <Form.Control type="password" placeholder="Enter new password" required
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