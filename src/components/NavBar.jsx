import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand >STB CRM</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/customers">Customers</Nav.Link>
                    <Nav.Link as={Link} to="/transactions">Trasactions</Nav.Link>
                </Nav>
                <Nav className="ms-auto">
                    <Nav.Link as={Link} to="/">Signout</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar