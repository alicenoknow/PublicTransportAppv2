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
		paper: { id: 1, value: "Bilety papierowe", isChecked: true,  type: TicketsType.paper },
		season: { id: 2, value: "Bilety terminowe", isChecked: true, type: TicketsType.season },
	};

	setTicketInfo() {
		const { oneWay, paper, season } = this.state;
		const allTypes = [oneWay, paper, season];
		const selectedItems = allTypes.filter(item => item.isChecked);
		const selectedTypes = selectedItems.map(item => item.type);
		const finalTypes = selectedTypes.length === 3 ? [] : selectedTypes;
		this.props.onTicketTypeChange(finalTypes);
	}

	handleCheckNormalElement = event => {
		const { oneWay, paper, season } = this.state;
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
			case paper.value: {
				this.setState(
					{
						paper: {
							...paper,
							isChecked: !paper.isChecked,
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
		const { oneWay, paper, season } = this.state;
		return (
			<div className="pickerContainer">
				<CheckBox
					key={oneWay.id}
					handleCheckElement={this.handleCheckNormalElement}
					value={oneWay.value}
					isChecked={oneWay.isChecked}
				/>
				<CheckBox
					key={paper.id}
					handleCheckElement={this.handleCheckNormalElement}
					value={paper.value}
					isChecked={paper.isChecked}
				/><CheckBox
					key={season.id}
					handleCheckElement={this.handleCheckNormalElement}
					value={season.value}
					isChecked={season.isChecked}
				/>
			</div>
		);
	}
}
