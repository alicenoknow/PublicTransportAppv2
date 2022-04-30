import React, { Component } from "react";
import { TicketsType } from "../../../redux/actionTypes";

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

export default class TicketPicker extends Component {
	state = {
		normal: { id: 0, value: "Bilety normalne", isChecked: true },
		reduced: { id: 1, value: "Bilety ulgowe", isChecked: true },
	};

	handleCheckNormalElement = event => {
		const { normal, reduced } = this.state;
		if (event.target.value === normal.value) {
			this.setState({
				normal: {
					...normal,
					isChecked: !normal.isChecked,
				},
			});
		} else {
			this.setState({
				reduced: {
					...reduced,
					isChecked: !reduced.isChecked,
				},
			});
		}

		const ticketType =
			normal.isChecked && reduced.isChecked
				? TicketsType.all
				: normal.isChecked
				? TicketsType.normal
				: TicketsType.reduced;
		this.props.onTicketTypeChange(ticketType);
	};

	render() {
		const { normal, reduced } = this.state;
		return (
			<div className="pickerContainer">
				<CheckBox
					key={normal.id}
					handleCheckElement={this.handleCheckNormalElement}
					value={normal.value}
					isChecked={normal.isChecked}
				/>
				<CheckBox
					key={reduced.id}
					handleCheckElement={this.handleCheckNormalElement}
					value={reduced.value}
					isChecked={reduced.isChecked}
				/>
			</div>
		);
	}
}
