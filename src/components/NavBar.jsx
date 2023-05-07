import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import redux methods
import { useSelector } from "react-redux";

const NavBar = () => {
    const user = useSelector(reducers => reducers.usersReducer);

    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">STB CRM</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/customers">Customers</Nav.Link>
                    <Nav.Link as={Link} to="/transactions">Trasactions</Nav.Link>
                </Nav>
                <Nav className="ms-auto">
                    {
                        JSON.stringify(user.Name) ? <Nav.Link as={Link} to="/">Signout</Nav.Link>
                            : <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                    }
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar