import { Container, Button, Form, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

import { useDispatch } from 'react-redux';

import { DateTime } from 'luxon';
import { readCustomersRequest } from '../../apiRequests/customersAPIs';
import { readUsersRequest, readUserRequest, updateUserRequest } from '../../apiRequests/usersAPIs';

// redux actions
import { addScrutinizedUserAction, addUsersAction } from '../../redux/features/users/usersSlice';
import { addCustomersAction } from "../../redux/features/customers/customersSlice"
import { changeLoadingAction } from "../../redux/features/loadingSlice";

// component
import LoadingModal from '../modals/LoadingModal';

// This component used by routes/PublicRoutes
// This component checks user credentials
const Login = () => {
    const emailID = useRef(null);
    const password = useRef(null);

    const navigate = useNavigate();

    // Create object of useDispatch method
    const dispatch = useDispatch();

    const updateLoginDateTime = async (user, object) => {
        const id = user._id
        await updateUserRequest(user, id, object)
    }

    // This function called on form's submit button (Login) clicked
    const handleLogin = async (e) => {
        e.preventDefault();

        const crediantials = {
            Email: emailID.current,
            Password: password.current.toString()
        }

        const user = await readUserRequest(crediantials);

        if (user.code === 404) {
            alert("Email ID not matching or not registered")
            return
        }

        if (user.code === 403) {
            alert("Password not matching, please check again.")
            return
        }

        if (user.code === 102) {
            alert("Wait for approval or contact to authority.")
            return
        }

        if (user.code === 401) {
            alert("You have been blocked.")
            return
        }

        // update redux to show loading modal
        dispatch(changeLoadingAction(true));

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

        // update user redux
        // dispatch(authenticateUserAction(user));
        dispatch(addScrutinizedUserAction(user));

        // Get users and update users rudux
        (user.Admin == "stb-crm" || user.Admin == "self") &&
            dispatch(addUsersAction(await readUsersRequest(user)));

        // Get customers and update customers rudux
        dispatch(addCustomersAction(await readCustomersRequest(user)));

        // update last login date and time in database
        updateLoginDateTime(user, { LastLogin: DateTime.now().toFormat("dd-MMM-yyyy hh:mm:ss a") });

        // update redux to hide loading modal
        dispatch(changeLoadingAction(false));

        // navigate to user or customer page
        user.Admin === "stb-crm" ? navigate("/private/users") : navigate("/private/customers");
    }

    return (
        <>
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
            </Container>

            {/* showing loading modal if that taking time */}
            <LoadingModal />
        </>
    )
}

export default Login