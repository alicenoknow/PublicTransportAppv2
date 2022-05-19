import React, { Component } from "react";
import { connect } from "react-redux";
import {
	updateStartStopsType,
	updateEndStopsType,
} from "../../../redux/actions";
import { StopsType } from "../../../redux/actionTypes";

const Checkbox = ({ label, value, onChange }) => {
	return (
		<label>
			<input type="checkbox" checked={value} onChange={onChange} />
			{label}
		</label>
	);
};

class BusStopsCheckBoxes extends Component {
	handleChangeOne = () => {
		const { isStart, updateStartStopsType, updateEndStopsType } = this.props;
		if (isStart) {
			updateStartStopsType(StopsType.one);
		} else {
			updateEndStopsType(StopsType.one);
		}
	};

	handleChangeArea = () => {
		const { isStart, updateStartStopsType, updateEndStopsType } = this.props;
		if (isStart) {
			updateStartStopsType(StopsType.area);
		} else {
			updateEndStopsType(StopsType.area);
		}
	};

	handleChangeAll = () => {
		const { isStart, updateStartStopsType, updateEndStopsType } = this.props;
		if (isStart) {
			updateStartStopsType(StopsType.all);
		} else {
			updateEndStopsType(StopsType.all);
		}
	};

	render() {
		const { isStart } = this.props;
		const stopType = isStart ? this.props.app.startStopsType : this.props.app.endStopsType;
		const pickOneValue = stopType === StopsType.one;
		const pickAreaValue = stopType === StopsType.area;
		const pickAllValue = stopType === StopsType.all;

		return (
			<React.Fragment>
				<div className="checkBoxContainer">
					<Checkbox
						label="  Wybrane przystanki"
						value={pickOneValue}
						onChange={this.handleChangeOne}
					/>
				</div>
				<div className="checkBoxContainer">
					<Checkbox
						label="  Wybrane obszary"
						value={pickAreaValue}
						onChange={this.handleChangeArea}
					/>
				</div>
				<div className="checkBoxContainer">
					<Checkbox
						label="  Wszystkie przystanki"
						value={pickAllValue}
						onChange={this.handleChangeAll}
					/>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => state;
const dispatchToProps = { updateStartStopsType, updateEndStopsType };

export default connect(mapStateToProps, dispatchToProps)(BusStopsCheckBoxes);
