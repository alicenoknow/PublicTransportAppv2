import React, { Component } from "react";
import { Container, Spinner } from "react-bootstrap";

class Loading extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<Container
				fluid
				className="p-0 bg-light text-center"
				style={{
					height: "100%",
					position: "fixed",
					alignContent: "center",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Spinner className={"mt-5"} animation="grow" variant="dark" />
			</Container>
		);
	}
}

export default Loading;
