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
	setServerQueryData,
	setLoading,
	setDataNotFound,
	reverseStartEnd,
	resetFilters,
} from "../../redux/actions";
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
import { ReactComponent as Reverse } from './rev.svg';
import { sendDataForAnalysis } from "../../services/analysis.service";

const triggerStyle = {width: "100%", flex: 1, display: "flex"};

class PanelContent extends Component {
	state = {
		isStartPointActive: true,
	};

	processData = async () => {
		this.props.setLoading(true);
		const result = await sendDataForAnalysis(this.props.app);
		this.props.setServerQueryData(result);
		if (result?.stats && result?.stats.length === 0) {
			this.props.setDataNotFound(true);
		}
		if (result === 401) {
			this.props.setAuth(false);
		}
	}

	getFiltersSelection = () => {
		return (
			<Collapsible trigger="Filtry" triggerStyle={triggerStyle}>
				<Collapsible className={"NestedCollapsible"} trigger="Wybierz godziny" triggerStyle={triggerStyle} >
					<TimeRange />
				</Collapsible>
				<Collapsible
					className={"NestedCollapsible"}
					trigger="Wybierz zakres dat" triggerStyle={triggerStyle}>
					<DateRange/>
				</Collapsible>
				<Collapsible
					className={"NestedCollapsible"}
					trigger="Wybierz dzień tygodnia" triggerStyle={triggerStyle}>
					<WeekDayPicker />
				</Collapsible>
				<Collapsible
					className={"NestedCollapsible"}
					trigger="Wybierz rodzaj biletów" triggerStyle={triggerStyle}>
					<TicketPicker  />
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
			<Collapsible trigger="Rodzaje wizualizacji" triggerStyle={triggerStyle}>
				<button onClick={this.props.reverseStartEnd} className="reverseButton">
					<Reverse className="reverse" />
				</button>
				<Collapsible
					className={"NestedCollapsibleStart"}
					openedClassName={"OpenedStart"}
					trigger="Wybierz początek trasy"
					open={isStartPointActive}
					onOpening={() => this.changeStartPointActive(true)}
					onClosing={() => this.changeStartPointActive(false)} triggerStyle={triggerStyle}>
					<BusStopsPicker isStart={true} />
				</Collapsible>
				<Collapsible
					className={"NestedCollapsibleEnd"}
					openedClassName={"OpenedEnd"}
					trigger="Wybierz koniec trasy"
					open={!isStartPointActive}
					onOpening={() => this.changeStartPointActive(false)}
					onClosing={() => this.changeStartPointActive(true)} triggerStyle={triggerStyle}>
					<BusStopsPicker />
				</Collapsible>
				<Collapsible
					className={"NestedCollapsible"}
					trigger="Wybierz rodzaj analizy" triggerStyle={triggerStyle}>
					<AnalysisPicker />
				</Collapsible>
			</Collapsible>
		);
	};

	getAreasSelection = () => {
		return (
			<Collapsible trigger="Obszary i przystanki" triggerStyle={triggerStyle}>
				<Collapsible className={"NestedCollapsible"} trigger="Widok" triggerStyle={triggerStyle}>
					<ViewPicker />
				</Collapsible>
				<Collapsible
					className={"NestedCollapsible"}
					trigger="Zarządzaj obszarami" triggerStyle={triggerStyle}>
					<AreasManager />
				</Collapsible>
			</Collapsible>
		);
	};

	render() {
		return (
			<React.Fragment>
				{this.getVisualizationSelection()}
				{this.getAreasSelection()}
				{this.getFiltersSelection()}
				<button onClick={this.processData} className="confirmButton">
					Przetwarzaj dane
				</button>
				<button onClick={this.props.resetFilters} className="minorButton">
					Wyczyść
				</button>
				<button onClick={this.downloadCSV} className="minorButton">
					Pobierz CSV
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
	setServerQueryData,
	setLoading,
	setDataNotFound,
	reverseStartEnd,
	resetFilters
};

export default connect(mapStateToProps, dispatchToProps)(PanelContent);
