import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import redux methods
import { useSelector, useDispatch } from "react-redux";
import { authenticateUserAction } from "../redux/actions"

const NavBar = () => {
    const user = useSelector(reducers => reducers.scrutinyReducer);

    JSON.stringify(user);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authenticateUserAction({}));
    }

    return (
        <Navbar bg="primary" variant="dark">
            {
                user.Name
                    ? <Container className="d-inline-flex">
                        <Navbar.Brand >STB CRM</Navbar.Brand>
                        {
                            user.Admin
                                ? <Nav className="me-auto">
                                    <Nav.Link as={Link} to="/customers">Customers</Nav.Link>
                                    <Nav.Link as={Link} to="/transactions">Trasactions</Nav.Link>
                                    <Nav.Link as={Link} to="/expiry">Expiry</Nav.Link>
                                    <Nav.Link as={Link} to="/users">Users</Nav.Link>
                                </Nav>
                                : <Nav className="me-auto">
                                    <Nav.Link as={Link} to="/customers">Customers</Nav.Link>
                                    <Nav.Link as={Link} to="/expiry">Expiry</Nav.Link>
                                </Nav>
                        }
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/" onClick={handleLogout}>Logout</Nav.Link>
                        </Nav>
                    </Container>
                    : <Container>
                        <Navbar.Brand >STB CRM</Navbar.Brand>
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                        </Nav>
                    </Container>
            }
        </Navbar>
    )
}

export default NavBar