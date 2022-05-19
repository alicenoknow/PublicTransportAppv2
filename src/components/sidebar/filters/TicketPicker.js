import React, { Component } from "react";
import { connect } from "react-redux";
import { setTicketsType } from "../../../redux/actions";

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

class TicketPicker extends Component {
	handleCheckNormalElement = event => {
		let tickets = this.props.app.filters.ticketType;
		tickets.forEach(ticket => {
			if (ticket.value === event.target.value)
				ticket.isChecked = event.target.checked;
		});
		this.props.setTicketsType(tickets);
	};

	render() {
		return (
			<div className="pickerContainer">
				{this.props.app.filters.ticketType.map(ticket => {
					return (
						<CheckBox
							key={ticket.id}
							handleCheckElement={this.handleCheckNormalElement}
							{...ticket}
						/>
					);
				})}
			</div>
		);
	}
}

const mapStateToProps = state => state;
const dispatchToProps = { setTicketsType };

export default connect(mapStateToProps, dispatchToProps)(TicketPicker);
