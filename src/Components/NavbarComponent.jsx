import { Component } from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

class NavbarComponent extends Component {

render() {
	return (
		<Navbar bg="dark" expand="lg" variant="dark">
            <Container>
            <Navbar.Brand href="/index">NASA APIs</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <NavDropdown title="APIs" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/reserv">Cadastrar Nova Reserva</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Reservas agendadas</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
	)
}
}

export default NavbarComponent;