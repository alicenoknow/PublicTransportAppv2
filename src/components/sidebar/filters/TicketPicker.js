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
		oneWay: { id: 0, value: "Bilety punktowe", isChecked: true, type: TicketsType.oneWay },
		season: { id: 1, value: "Bilety terminowe", isChecked: true, type: TicketsType.season },
	};

	setTicketInfo() {
		const { oneWay, season } = this.state;
		const allTypes = [oneWay, season];
		const selectedItems = allTypes.filter(item => item.isChecked);
		const selectedTypes = selectedItems.map(item => item.type);
		const finalTypes = selectedTypes.length === 2 ? [] : selectedTypes;
		this.props.onTicketTypeChange(finalTypes);
	}

	handleCheckNormalElement = event => {
		const { oneWay, season } = this.state;
		switch (event.target.value) {
			case oneWay.value: {
				this.setState(
					{
						oneWay: {
							...oneWay,
							isChecked: !oneWay.isChecked,
						},
					},
					this.setTicketInfo,
				);
				break;
			}
			case season.value: {
				this.setState(
					{
						season: {
							...season,
							isChecked: !season.isChecked,
						},
					},
					this.setTicketInfo,
				);
				break;
			}
			default:
				break;
		}
	};

	render() {
		const { oneWay, season } = this.state;
		return (
			<div className="pickerContainer">
				<CheckBox
					key={oneWay.id}
					handleCheckElement={this.handleCheckNormalElement}
					value={oneWay.value}
					isChecked={oneWay.isChecked}
				/>
				<CheckBox
					key={season.id}
					handleCheckElement={this.handleCheckNormalElement}
					value={season.value}
					isChecked={season.isChecked}
				/>
			</div>
		);
	}
}
