import React, { Component } from "react";
import { Spinner } from "react-bootstrap";

class Loading extends Component {
	render() {
		return (
			<div className="spinner">
				<Spinner
					style={{ height: 80, width: 80 }}
					className={"mt-5"}
					animation="border"
					variant="dark"
				/>
			</div>
		);
	}
}

export default Loading;
