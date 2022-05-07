import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

export default class AreaTitleInput extends Component {
	state = {
		value: "",
	};

	render() {
		return (
			<div className="areaTitleInput">
				<Form className="formInput">
					<Form.Group controlId="formBasicEmail">
						<Form.Control
							type="text"
							className="inputPadding"
							placeholder="Nazwa obszaru"
							value={this.state.value}
							onChange={e => this.setState({ value: e.target.value })}
						/>
					</Form.Group>
					<Button
						variant="info"
						type="button"
						onClick={() => this.props.setAreaTitle(this.state.value)}>
						Utwórz
					</Button>
				</Form>
			</div>
		);
	}
}
