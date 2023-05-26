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
        <Navbar collapseOnSelect expand="sm" bg="primary" variant="dark" style={{ textAlign: "left" }}>
            {
                user.Name
                    ? <Container className="d-inline-flex">
                        <Navbar.Brand >STB CRM</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
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
                        </Navbar.Collapse>
                    </Container>
                    : <Container>
                        <Navbar.Brand >STB CRM</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="ms-auto">
                                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
            }
        </Navbar>
    )
}

export default NavBar