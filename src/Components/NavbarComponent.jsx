import { Component } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

class NavbarComponent extends Component {

render() {
	return (
		<Navbar bg="dark" expand="lg" variant="dark" className="fixed-top">
            <Container>
            <Navbar.Brand href="/">NASA APIs</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <NavDropdown title="APIs" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/nearbyAsteroids">Asteróides próximos da Terra</NavDropdown.Item>
                    <NavDropdown.Item href="/marsRover">Fotos diárias do Mars Rovers</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
	)
}
}

export default NavbarComponent;