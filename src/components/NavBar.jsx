import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import redux methods
import { useSelector, useDispatch } from "react-redux";
import { authenticateUserAction } from "../redux/actions"

const NavBar = () => {
    const scrutinizedUser = useSelector(reducers => reducers.scrutinyUserReducer);

    // JSON.stringify(scrutinizedUser);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authenticateUserAction({}));
    }

    return (
        <Navbar collapseOnSelect expand="sm" bg="primary" variant="dark" style={{ textAlign: "left" }}>
            {/* Navbar on Login */}
            {scrutinizedUser.token ?
                <Container className="d-inline-flex">
                    <Navbar.Brand >STB CRM</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {/* Comman Links (self Admin and User both can access) */}
                            {scrutinizedUser.Admin === "stb-crm"
                                ? <Nav.Link as={Link} to="/users">Users</Nav.Link>
                                
                                : <Nav>
                                    <Nav.Link as={Link} to="/customers">Customers</Nav.Link>
                                    <Nav.Link as={Link} to="/transactions">Trasactions</Nav.Link>
                                </Nav>
                            }

                            {/* Admin Links (Only Admin can access) */}
                            {scrutinizedUser.Admin == "self" &&
                                <Nav>
                                    <Nav.Link as={Link} to="/users">Users</Nav.Link>
                                    <Nav.Link as={Link} to="/statistics">Statistics</Nav.Link>
                                </Nav>
                            }
                        </Nav>

                        <Nav>
                            <Nav.Link as={Link} to="/" onClick={handleLogout}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>

                : <Container> {/* Navbar after Logout */}
                    <Navbar.Brand >STB CRM</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            }
        </Navbar >
    )
}

export default NavBar