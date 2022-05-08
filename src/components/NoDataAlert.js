import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert, Button } from "react-bootstrap";
import { setDataNotFound } from "../redux/actions";

class NoDataAlert extends Component {
	render() {
		return (
			<div className="noDataAlert">
				<Alert
					key={"warning"}
					variant={"warning"}
                    className="alertRow"
                    >
					<Alert.Heading>
						Brak danych dla zastosowanych parametrów
					</Alert.Heading>
					<Button
						className="removeButton"
						type="button"
						size="sm"
						onClick={() =>this.props.setDataNotFound(false)}>
						<div className="cross" />
					</Button>
				</Alert>
			</div>
		);
	}
}

const mapStateToProps = state => state;
const dispatchToProps = {
	setDataNotFound,
};

export default connect(mapStateToProps, dispatchToProps)(NoDataAlert);
