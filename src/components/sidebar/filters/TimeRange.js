import React, { Component } from "react";
import moment from "moment";
import NumberPicker from "react-widgets/NumberPicker";
import TimeInput from "react-widgets/TimeInput";
import { connect } from "react-redux";
import "react-widgets/styles.css";
import {
	setStartTime,
	setEndTime,
	setIntervalEnd,
	setIntervalStart,
} from "../../../redux/actions";
import { AnalysisType } from "../../../redux/actionTypes";

class TimelineRange extends Component {

	onChangeFromCallback = fromTime => {
		this.props.setStartTime(fromTime);
	};

	onChangeToCallback = toTime => {
		this.props.setEndTime(toTime);
	};

	onChangeIntervalFromCallback = fromTime => {
		this.props.setIntervalStart(fromTime);
	};

	onChangeIntervalToCallback = toTime => {
		this.props.setIntervalEnd(toTime);

	};

	getIntervalUpperBound = isUpper => {
		const { startTime, intervalEndTime } = this.props.app.filters;
		if (startTime !== undefined) {
			if (intervalEndTime !== undefined && !isUpper) {
				return Math.min(24 - moment(startTime).hours(), intervalEndTime);
			}
			return 24 - moment(startTime).hours();
		}
		return 24;
	};

	getIntervalLowerBound = isUpper => {
		const { intervalStartTime } = this.props.app.filters;
		if (isUpper && intervalStartTime !== undefined) {
			return Math.max(0, intervalStartTime);
		}
		return 0;
	};

	isTwoWay = () => {
		const analysis = this.props.app.analysisType;
		const twoWay = analysis.find(item => item.type === AnalysisType.twoWay);
		return twoWay.isChecked;
	}

	render() {
		const { startTime, endTime, intervalStartTime, intervalEndTime } = this.props.app.filters;
		return (
			<div className="timers">
				<p>
					{`${
						startTime !== undefined && endTime !== undefined
							? `Odjazd między ${moment(startTime).format("HH:mm")} - ${moment(
								endTime,
							  ).format("HH:mm")}`
							: ""
					}`}
				</p>
				<p>
					{`${
						intervalStartTime !== undefined && intervalEndTime !== undefined
							? `Powrót po ${intervalStartTime} - ${intervalEndTime} godzinach`
							: ""
					}`}
				</p>
				<div className="timeRow">
					<p>Wybierz godzinę początkową: </p>
					<TimeInput onChange={this.onChangeFromCallback} value={startTime} />
				</div>
				<div className="timeRow">
					<p>Wybierz godzinę końcową: </p>
					<TimeInput onChange={this.onChangeToCallback} value={endTime} />
				</div>
				{this.isTwoWay() && (
					<>
						<div className="timeRow">
							<p>Wybierz początek interwału: </p>
							<NumberPicker
								value={intervalStartTime}
								step={0.5}
								onChange={this.onChangeIntervalFromCallback}
								min={this.getIntervalLowerBound()}
								max={this.getIntervalUpperBound()}
							/>
						</div>
						<div className="timeRow">
							<p>Wybierz koniec interwału: </p>
							<NumberPicker
								value={intervalEndTime}
								step={0.5}
								onChange={this.onChangeIntervalToCallback}
								min={this.getIntervalLowerBound(true)}
								max={this.getIntervalUpperBound(true)}
							/>
						</div>
					</>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => state;
const dispatchToProps = {
	setStartTime,
	setEndTime,
	setIntervalEnd,
	setIntervalStart,
};

export default connect(mapStateToProps, dispatchToProps)(TimelineRange);
