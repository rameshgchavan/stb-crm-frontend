import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import redux methods
import { useSelector, useDispatch } from "react-redux";
import { addScrutinizedUserAction } from "../redux/features/users/usersSlice";

// This component used in components/Header.jsx
// This component shows page navigation links
const NavBar = () => {
    const { scrutinizedUser } = useSelector(state => state.usersReducer);

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(addScrutinizedUserAction({}));
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
                            {scrutinizedUser.Admin !== "stb-crm" &&
                                <Nav>
                                    <Nav.Link as={Link} to="/private/customers">Customers</Nav.Link>
                                    <Nav.Link as={Link} to="/private/transactions">Transactions</Nav.Link>
                                </Nav>
                            }

                            {/* Admin Links (Only Admin can access) */}
                            {scrutinizedUser.Admin == "self" &&
                                <Nav>
                                    <Nav.Link as={Link} to="/private/plans">Plans</Nav.Link>
                                    <Nav.Link as={Link} to="/private/statistics">Statistics</Nav.Link>
                                    <Nav.Link as={Link} to="/private/users">Users</Nav.Link>
                                    <Nav.Link as={Link} to="/private/setting">Setting</Nav.Link>
                                </Nav>
                            }
                        </Nav>

                        <Nav>
                            <Nav.Link as={Link} to="/login" onClick={handleLogout}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>

                : <Container> {/* Navbar after Logout */}
                    <Navbar.Brand >STB CRM</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                            <Nav.Link as={Link} to="/" >Home</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            }
        </Navbar >
    )
}

export default NavBar