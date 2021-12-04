
import React, { Component } from "react";

import { Navbar, Nav } from 'react-bootstrap';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    toggleModal = (show) => {
        this.setState({
            show: show
        });
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark" sticky="top" expand="lg">
                <Navbar.Brand href="#home" className={"text-center"}>
                    Kox wizualizator
                </Navbar.Brand>
                {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className={"justify-content-end"}>
                    <Nav>
                        <div>Eloeleoeleo</div>
                    </Nav>
                </Navbar.Collapse> */}
            </Navbar>
        );
    }
}

export default Header;