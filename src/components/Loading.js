import React, { Component } from "react";
import { Container, Spinner } from "react-bootstrap";

class Loading extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	containerStyle = {
		height: "100%",
		position: "absolute",
		alignItems: "center",
		justifyContent: "center",		
	}

	spinnerStyle = {
		position: "relative",
		display: "flex",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		marginTop: "30vh"
	}

	render() {
		return (
			<Container fluid className="p-0 bg-dark" style={this.containerStyle}>
				<div style={this.spinnerStyle}>
					<Spinner className={"mt-5"} animation="grow" variant="light" />
					</div>
			</Container>
		);
	}
}

export default Loading;
