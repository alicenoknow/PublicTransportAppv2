import React, { Component } from "react";

import { Navbar, Nav } from "react-bootstrap";

class Header extends Component {
	render() {
		return (
			<Navbar bg="dark" variant="dark" sticky="top" expand="lg">
				<Navbar.Brand href="/" className={"text-center"}>
					Analiza transportu publicznego w Rybniku
				</Navbar.Brand>
				<Nav className="me-auto">
					<Nav.Link href="/upload">Dane</Nav.Link>
					<Nav.Link href="/help">Pomoc</Nav.Link>
				</Nav>
			</Navbar>
		);
	}
}

export default Header;
