import React, { Component } from "react";
import { ScrollView } from "@cantonjs/react-scroll-view";
import { connect } from "react-redux";
import Collapsible from "react-collapsible";
import { StopsType, TicketsType } from "../../redux/actionTypes";

const WEEKDAYS = {
	0: "poniedziałek ",
	1: "wtorek ",
	2: "środa ",
	3: "czwartek ",
	4: "piątek ",
	5: "sobota ",
	6: "niedziela ",
};

class InfoPanelContent extends Component {
	renderPointInfo = (type, areas, stops) => {
		const { busStopsData, areasData } = this.props.app;
		switch (type) {
			case StopsType.all: {
				return <p>Wybrano wszystkie przystanki</p>;
			}
			case StopsType.one: {
				return (
					<div key="stops">
						<p>Wybrane przystanki:</p>
						{stops.map(item => (
							<p key={busStopsData[item].name}>{busStopsData[item].name}</p>
						))}
					</div>
				);
			}
			case StopsType.area: {
				return (
					<div key="areas">
						<p>Wybrane obszary:</p>
						{areas.map(item => (
							<p key={areasData[item].id}>{areasData[item].properties.NAZWA}</p>
						))}
					</div>
				);
			}
			default:
				return null;
		}
	};

	renderFiltersInfo = filters => {
		const {
			startDate,
			endDate,
			startTime,
			endTime,
			intervalEndTime,
			intervalStartTime,
			weekDays,
			ticketType,
		} = filters;
		if (
			!startDate &&
			!endDate &&
			!startTime &&
			!endTime &&
			!intervalStartTime &&
			!intervalEndTime &&
			weekDays.length === 7 &&
			ticketType === TicketsType.all
		) {
			return <div key="filter">Brak filtrów</div>;
		}
		return (
			<div key="filter">
				{startDate && <div>Data początkowa: {startDate.toString()}</div>}
				{endDate && <div>Data końcowa: {endDate.toString()}</div>}
				{startTime && (
					<div>Godzina początkowa: {startTime.toLocaleTimeString()}</div>
				)}
				{endTime && <div>Godzina końcowa: {endTime.toLocaleTimeString()}</div>}
				{intervalStartTime && (
					<div>Początek interwału: {intervalStartTime}</div>
				)}
				{intervalEndTime && <div>Koniec interwału: {intervalEndTime}</div>}
				{weekDays.length !== 7 && (
					<div>Dni tygodnia: {weekDays.map(day => WEEKDAYS[day])}</div>
				)}
				{ticketType !== TicketsType.all && (
					<div>Rodzaj biletów: {ticketType}</div>
				)}
			</div>
		);
	};

	renderCurrentInfo = currentInfo => {
		return (
			<div key="info">
				{currentInfo.map((item, idx) => (
					<p key={`${idx}`}>{item}</p>
				))}
			</div>
		);
	};

	render() {
		const {
			app: {
				startStopsType,
				endStopsType,
				startAreas,
				endAreas,
				startBusStops,
				endBusStops,
				filters,
				currentInfo,
			},
		} = this.props;
		return (
			<>
				<ScrollView style={{ height: "100%" }}>
					<Collapsible trigger="Informacje" open>
						{this.renderCurrentInfo(currentInfo)}
					</Collapsible>
					<Collapsible trigger="Wybrany początek trasy" open>
						{this.renderPointInfo(startStopsType, startAreas, startBusStops)}
					</Collapsible>
					<Collapsible trigger="Wybrany koniec trasy" open>
						{this.renderPointInfo(endStopsType, endAreas, endBusStops)}
					</Collapsible>
					<Collapsible trigger="Wybrane filtry" open>
						{this.renderFiltersInfo(filters)}
					</Collapsible>
				</ScrollView>
			</>
		);
	}
}

const mapStateToProps = state => state;
const dispatchToProps = {};

export default connect(mapStateToProps, dispatchToProps)(InfoPanelContent);
