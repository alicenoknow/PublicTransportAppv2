import React, { Component } from "react";

import { Navbar, Nav } from "react-bootstrap";

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
		};
	}

	toggleModal = show => {
		this.setState({
			show: show,
		});
	};

	render() {
		return (
			<Navbar bg="dark" variant="dark" sticky="top" expand="lg">
				<Navbar.Brand href="/" className={"text-center"}>
					Analiza transportu publicznego w Rybniku
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/">Strona główna</Nav.Link>
						<Nav.Link href="/admin">Admin</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default Header;
