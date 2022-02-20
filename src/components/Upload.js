import React from "react";
import { Component } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Upload extends Component {
  render() {
    return (
      <Container fluid className="p-0 bg-dark">
        <form method="post" action="#" id="#" onSubmit={() => {}}>
          <div className="form-group files">
            <label>Załaduj dane</label>
            <input
              type="file"
              onChange={() => {}}
              className="form-control"
              multiple
            />
          </div>

          <Button
            className="loginButton"
            size="lg"
            type="submit"
            disabled={!this.validateForm()}
          >
            Prześlij
          </Button>
        </form>
      </Container>
    );
  }
}

export default Upload;
