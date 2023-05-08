import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import redux methods
import { useSelector, useDispatch } from "react-redux";
import { authenticateUser } from "../redux/actions"

const NavBar = () => {
    const user = useSelector(reducers => reducers.usersReducer);

    JSON.stringify(user);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authenticateUser({}));
    }

    return (
        <Navbar bg="primary" variant="dark">
            {
                user.Name
                    ? <Container>
                        <Navbar.Brand >STB CRM</Navbar.Brand>
                        {
                            user.Admin
                                ? <Nav className="me-auto">
                                    <Nav.Link as={Link} to="/customers">Customers</Nav.Link>
                                    <Nav.Link as={Link} to="/transactions">Trasactions</Nav.Link>
                                </Nav>
                                : ""
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