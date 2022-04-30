import React, { Component } from "react";
import { connect } from "react-redux";
import { setBusStopsVisibility, setAreasVisibility } from "../../../redux/actions";

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

class ViewPicker extends Component {
	state = {
		busStops: { id: 0, value: "Pokaż przystanki", isChecked: true },
		areas: { id: 1, value: "Pokaż obszary", isChecked: false },
	};

	handleCheck = event => {
		const { busStops, areas } = this.state;
		if (event.target.value === busStops.value) {
			this.setState({
				busStops: {
					...busStops,
					isChecked: !busStops.isChecked,
				},
			});
			this.props.setBusStopsVisibility(!busStops.isChecked);
		} else {
			this.setState({
				areas: {
					...areas,
					isChecked: !areas.isChecked,
				},
			});
			this.props.setAreasVisibility(!areas.isChecked);
		}
	};

	render() {
		const { busStops, areas } = this.state;
		return (
			<div className="pickerContainer">
				<CheckBox
					key={busStops.id}
					handleCheckElement={this.handleCheck}
					value={busStops.value}
					isChecked={busStops.isChecked}
				/>
				<CheckBox
					key={areas.id}
					handleCheckElement={this.handleCheck}
					value={areas.value}
					isChecked={areas.isChecked}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => state;
const dispatchToProps = { setBusStopsVisibility, setAreasVisibility };

export default connect(mapStateToProps, dispatchToProps)(ViewPicker);
