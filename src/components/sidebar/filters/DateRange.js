import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import {
	setStartDate,
	setEndDate,
} from "../../../redux/actions";

class DateRange extends Component {
	onStartDate = date => {
		this.props.setStartDate(date);
	};

	onEndDate = date => {
		this.props.setEndDate(date);
	};

	renderDatePicker = (value, handler, title) => {
		return (
			<div className="datePicker">
				<p>{title}</p>
				<DatePicker selected={value} onChange={handler} />
			</div>
		);
	};

	render() {
		const { startDate, endDate } = this.props.app.filters;
		return (
			<React.Fragment>
				{this.renderDatePicker(
					startDate,
					this.onStartDate,
					"Wybierz datę początkową:",
				)}
				{this.renderDatePicker(
					endDate,
					this.onEndDate,
					"Wybierz datę końcową:",
				)}
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => state;
const dispatchToProps = {
	setStartDate,
	setEndDate,
};

export default connect(mapStateToProps, dispatchToProps)(DateRange);
