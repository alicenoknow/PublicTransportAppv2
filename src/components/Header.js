import React, { Component } from "react";

import { Navbar } from "react-bootstrap";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  toggleModal = (show) => {
    this.setState({
      show: show,
    });
  };

  render() {
    return (
      <Navbar bg="dark" variant="dark" sticky="top" expand="lg">
        <Navbar.Brand href="#home" className={"text-center"}>
          Analiza transportu publicznego w Rybniku
        </Navbar.Brand>
      </Navbar>
    );
  }
}

export default Header;
