import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Admin extends Component {
  state = {
    email: "",
    password: "",
  };

  validateEmail = () => {
    const { email } = this.state;
    return email.length > 0 && email.includes("@");
  };

  validateForm = () => {
    const { password } = this.state;
    return this.validateEmail() && password.length > 0;
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    const { email, password } = this.state;
    return (
      <Container fluid className="p-0 bg-dark">
        <div className="login">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="emailLogin" size="lg" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Hasło</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </Form.Group>
            <div className="loginButtons">
              <Button
                className="loginButton"
                block
                size="lg"
                type="submit"
                disabled={!this.validateForm()}
              >
                Zaloguj
              </Button>
              <button
                class="btn btn-link"
                block
                size="lg"
                type="button"
                disabled={!this.validateEmail()}
              >
                Resetuj hasło
              </button>
            </div>
          </Form>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => state;
const dispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, dispatchToProps)(Admin);
