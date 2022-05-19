import React, { Component } from "react";
import { connect } from "react-redux";
import { setAnalysisType } from "../../../redux/actions";

const CheckBox = props => {
	return (
		<p>
			<input
				key={props.id}
				onChange={props.handleCheckElement}
				onClick={props.handleCheckElement}
				type="checkbox"
				checked={props.isChecked}
				value={props.value}
			/>{" "}
			{props.value}
		</p>
	);
};

class AnalysisPicker extends Component {
	handleCheckNormalElement = event => {
		let tickets = this.props.app.filters.ticketType;
		tickets.forEach(ticket => {
			if (ticket.value === event.target.value)
				ticket.isChecked = event.target.checked;
		});
		this.props.setTicketsType(tickets);
	};

	handleCheckElement = event => {
		let analysisTypes = this.props.app.analysisType;
		analysisTypes.forEach(analysis => {
			if (analysis.value === event.target.value) {
				analysis.isChecked = event.target.checked;
			} else {
				analysis.isChecked = !event.target.checked;
			}
		});

		this.props.setAnalysisType(analysisTypes);
	};

	render() {
		return (
			<div className="pickerContainer">
				{this.props.app.analysisType.map(type => {
					return (
						<CheckBox
							key={type.id}
							handleCheckElement={this.handleCheckElement}
							{...type}
						/>
					);
				})}
			</div>
		);
	}
}

const mapStateToProps = state => state;
const dispatchToProps = { setAnalysisType };

export default connect(mapStateToProps, dispatchToProps)(AnalysisPicker);
