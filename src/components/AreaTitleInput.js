import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { setNewAreaTitle } from "../redux/actions";

class AreaTitleInput extends Component {
	state = {
		val: "",
	};

	render() {
		const {
			app: { isDrawModeActive },
		} = this.props;

		if (!isDrawModeActive) {
			return null;
		}

		return (
			<div className="areaTitleInput">
				<Form className="formInput">
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Control
							type="text"
							placeholder="Nazwa obszaru"
							value={this.state.val}
							onChange={e => this.setState({ val: e.target.value })}
						/>
					</Form.Group>
					<Button
						variant="info"
						type="button"
						onClick={() => {
							this.props.setNewAreaTitle(this.state.val);
							this.setState({ val: "" });
						}}>
						Utwórz
					</Button>
				</Form>
			</div>
		);
	}
}

const mapStateToProps = state => state;
const dispatchToProps = {
	setNewAreaTitle,
};

export default connect(mapStateToProps, dispatchToProps)(AreaTitleInput);
