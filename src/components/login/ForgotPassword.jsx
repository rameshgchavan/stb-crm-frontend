import { Container, Button, Form } from 'react-bootstrap';
import emailjs from "@emailjs/browser";
// Import axios
import axios from "axios";

// Import actions from redux/actions folder
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

const ForgotPassword = () => {
    const [disabled, setDidsabled] = useState(false);
    const [hidden, setHidden] = useState(true);

    const otpForm = useRef();

    const randomNumber = Math.floor(Math.random() * (1000000 - 1)).toString();
    const emailOTP = useRef(randomNumber);
    const userOTP = useRef(null)
    const emailID = useRef(null);
    const newPassword = useRef(null);
    const confirmPassword = useRef(null);

    const navigate = useNavigate();

    const sendEmail = async (e) => {
        e.preventDefault();

        const isEmail = await axios("/users/isemail", {
            method: "post",
            data: { Email: emailID.current.trim() }
        });

        if (isEmail.data.code == 200) {
            console.warn(emailOTP);

            // emailjs.sendForm('service_6bhhezj', 'template_svo2tbq', otpForm.current, 'llSBBJFE7skawlOYO')
            //     .then((result) => {
            //         console.warn(result.text);
            //     }, (error) => {
            //         console.warn(error.text);
            //     });

            setDidsabled(true);
            setHidden(false);
        }
        else if (isEmail.data.code == 404) {
            alert(isEmail.data.message);
        }
        else { alert(isEmail) }
    };

    const handleReset = async (e) => {
        e.preventDefault();

        if (emailOTP.current !== userOTP.current) {
            alert("OTP not matching, check again.")
            return
        }

        if (newPassword.current !== confirmPassword.current) {
            alert("Password not matching, try again.")
            return
        }

        const userCredentails = {
            Email: emailID.current.trim(),
            Password: newPassword.current.trim(),
        }

        const user = await axios("/users/resetpass", {
            method: "put",
            data: userCredentails
        })

        if (user.data.code === 202) {
            alert("Password changed successfully.");
            navigate("/");
        }
        else { navigate("/forgotpass"); }

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

            <Form onSubmit={handleReset} className='mt-3' hidden={hidden}>
                <Form.Group className="my-3" controlId="formBasicOTP">
                    <Form.Text className="text-muted">
                        Check your email for OTP
                    </Form.Text>
                    <Form.Control type="text" placeholder="Enter OTP" required
                        onChange={(e) => userOTP.current = e.target.value} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicNewPassword">
                    <Form.Label>Enter password</Form.Label>
                    <Form.Control type="password" placeholder="Enter new password" required
                        onChange={(e) => newPassword.current = e.target.value} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" required
                        onChange={(e) => confirmPassword.current = e.target.value} />
                </Form.Group>

                <Button variant="primary" type="submit" >
                    Reset
                </Button>
            </Form>
        </Container>
    )
}

export default ForgotPassword