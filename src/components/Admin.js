import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Container, Button } from "react-bootstrap";

class Admin extends Component {
	state = {
		email: "",
		password: "",
	};

	render() {
		return (
			<Container fluid className="p-0 bg-dark">
				<div className="admin">
					<Button
						className="loginButton"
						size="lg"
						href="/upload"
						type="button"
						>
						Prześlij dane
					</Button>
				</div>
			</Container>
		);
	}
}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, dispatchToProps)(Admin);
