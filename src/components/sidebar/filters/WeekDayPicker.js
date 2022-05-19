import React, { Component } from "react";
import { connect } from "react-redux";
import { setWeekdays } from "../../../redux/actions";

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

class WeekDayPicker extends Component {
	handleCheckElement = event => {
		let weekdays = this.props.app.filters.weekDays;
		weekdays.forEach(day => {
			if (day.value === event.target.value)
				day.isChecked = event.target.checked;
		});
		this.props.setWeekdays(weekdays);
	};

	render() {
		return (
			<div className="pickerContainer">
				{this.props.app.filters.weekDays.map(day => {
					return (
						<CheckBox
							key={day.id}
							handleCheckElement={this.handleCheckElement}
							{...day}
						/>
					);
				})}
			</div>
		);
	}
}

const mapStateToProps = state => state;
const dispatchToProps = { setWeekdays };

export default connect(mapStateToProps, dispatchToProps)(WeekDayPicker);
