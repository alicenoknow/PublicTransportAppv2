import React, { Component } from "react";
import { connect } from "react-redux";


class LoadingAlert extends Component {
	render() {
		const { isLoading } = this.props.app.isLoading;
		if (isLoading) {
			return (
				<div className="loadingAlert">
					<h3>{isLoading}</h3>
				</div>
			);
		}
		return null;
	}
}

const mapStateToProps = state => state;
const dispatchToProps = {};

export default connect(mapStateToProps, dispatchToProps)(LoadingAlert);
