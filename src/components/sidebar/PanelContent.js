import React, { Component } from "react";
import Collapsible from "react-collapsible";
import { connect } from "react-redux";
import {
	setStartTime,
	setEndTime,
	setStartDate,
	setEndDate,
	setWeekdays,
	setTicketsType,
	setIntervalEnd,
	setIntervalStart,
	setStartPoint,
} from "../../redux/actions";
import {
	fetchFromArea,
	fetchFromList,
	fetchToList,
	fetchToArea,
} from "../../services/apiService";
import {
	fetchBusStops
} from '../../services/api.service';
import {
	DateRange,
	AreasManager,
	BusStopsPicker,
	TicketPicker,
	TimeRange,
	ViewPicker,
	WeekDayPicker,
	AnalysisPicker,
} from "./filters";
import { StopsType } from "../../redux/actionTypes";

class PanelContent extends Component {
	state = {
		isStartPointActive: true
	}

	processData = () => {
		const { app, setData, setServerWait } = this.props;
		setServerWait();
		console.warn(app.chosenBusStops)
		if (app.stopsType === StopsType.one || app.stopsType === StopsType.all) {
			fetchFromList(data => setData(data), {
				filters: {
					startDate: app.filters.startDate,
					endDate: app.filters.endDate,
					startTime: app.filters.startTime,
					endTime: app.filters.endTime,
					weekDays: app.filters.weekDays,
				},
				busStops:
					app.chosenBusStops.length === 0 ? undefined : [app.chosenBusStops],
			});
		} else {
			fetchFromArea(data => setData(data), {
				filters: {
					startDate: app.filters.startDate,
					endDate: app.filters.endDate,
					startTime: app.filters.startTime,
					endTime: app.filters.endTime,
					weekDays: app.filters.weekDays,
				},
				corners: app.chosenBusStops[0],
			});
		}

		if (app.stopsType === StopsType.one || app.stopsType === StopsType.all) {
			fetchToList(data => setData(data), {
				filters: {
					startDate: app.filters.startDate,
					endDate: app.filters.endDate,
					startTime: app.filters.startTime,
					endTime: app.filters.endTime,
					weekDays: app.filters.weekDays,
				},
				busStops:
					app.chosenBusStops.length === 0 ? undefined : [app.chosenBusStops],
			});
		} else {
			fetchToArea(data => setData(data), {
				filters: {
					startDate: app.filters.startDate,
					endDate: app.filters.endDate,
					startTime: app.filters.startTime,
					endTime: app.filters.endTime,
					weekDays: app.filters.weekDays,
				},
				corners: app.chosenBusStops[0],
			});
		}
	};

	getFiltersSelection = () => {
		return (
			<Collapsible trigger="Filtry">
				<Collapsible className={"NestedCollapsible"} trigger="Wybierz godziny">
					<TimeRange
						onStartTimeChange={this.props.setStartTime}
						onEndTimeChange={this.props.setEndTime}
						onIntervalStartTimeChange={this.props.setIntervalStart}
						onIntervalEndTimeChange={this.props.setIntervalEnd}
					/>
				</Collapsible>
				<Collapsible
					className={"NestedCollapsible"}
					trigger="Wybierz zakres dat">
					<DateRange
						onStartDateChange={this.props.setStartDate}
						onEndDateChange={this.props.setEndDate}
					/>
				</Collapsible>
				<Collapsible
					className={"NestedCollapsible"}
					trigger="Wybierz dzień tygodnia">
					<WeekDayPicker onWeekDaysChange={this.props.setWeekdays} />
				</Collapsible>
				<Collapsible
					className={"NestedCollapsible"}
					trigger="Wybierz rodzaj biletów">
					<TicketPicker onTicketTypeChange={this.props.setTicketsType} />
				</Collapsible>
			</Collapsible>
		);
	};

	changeStartPointActive = isActive => {
		const { setStartPoint } = this.props;
		if (this.state.isStartPointActive !== isActive) {
			this.setState({ isStartPointActive: isActive }, () =>
				setStartPoint(isActive),
			);
		}
	};

	getVisualizationSelection = () => {
		const { isStartPointActive } = this.state;
		return (
			<Collapsible trigger="Rodzaje wizualizacji">
				<Collapsible
					className={"NestedCollapsibleStart"}
					openedClassName={"OpenedStart"}
					trigger="Wybierz początek trasy"
					open={isStartPointActive}
					onOpening={() => this.changeStartPointActive(true)}
					onClosing={() => this.changeStartPointActive(false)}>
					<BusStopsPicker isStart={true} />
				</Collapsible>
				<Collapsible
					className={"NestedCollapsibleEnd"}
					openedClassName={"OpenedEnd"}
					trigger="Wybierz koniec trasy"
					open={!isStartPointActive}
					onOpening={() => this.changeStartPointActive(false)}
					onClosing={() => this.changeStartPointActive(true)}>
					<BusStopsPicker />
				</Collapsible>
				<Collapsible
					className={"NestedCollapsible"}
					trigger="Wybierz rodzaj analizy">
					<AnalysisPicker />
				</Collapsible>
			</Collapsible>
		);
	};

	getAreasSelection = () => {
		return (
			<Collapsible trigger="Obszary i przystanki">
				<Collapsible className={"NestedCollapsible"} trigger="Widok">
					<ViewPicker />
				</Collapsible>
				<Collapsible
					className={"NestedCollapsible"}
					trigger="Zarządzaj obszarami">
					<AreasManager />
				</Collapsible>
			</Collapsible>
		);
	};

	render() {
		return (
			<React.Fragment>
				{this.getAreasSelection()}
				{this.getFiltersSelection()}
				{this.getVisualizationSelection()}
				<button onClick={this.processData} className="confirmButton">
					Przetwarzaj dane
				</button>
				<button onClick={fetchBusStops} className="saveButton">
					Zapisz dane
				</button>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => state;
const dispatchToProps = {
	setStartDate,
	setEndDate,
	setStartTime,
	setEndTime,
	setIntervalStart,
	setIntervalEnd,
	setWeekdays,
	setStartPoint,
	setTicketsType,
};

export default connect(mapStateToProps, dispatchToProps)(PanelContent);
