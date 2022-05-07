import React, { Component } from "react";
import { ScrollView } from "@cantonjs/react-scroll-view";
import { connect } from "react-redux";
import Collapsible from "react-collapsible";
import { StopsType } from "../../redux/actionTypes";
import { setHighlight } from "../../redux/actions";

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
		console.warn(areas, areasData)
		switch (type) {
			case StopsType.all: {
				return <p>Wybrano wszystkie przystanki</p>;
			}
			case StopsType.one: {
				return (
					<div key="stops">
						<p>Wybrane przystanki:</p>
						{stops.length > 0 && stops.map(item => (
							<p key={busStopsData[item].name}>{busStopsData[item].name}</p>
						))}
					</div>
				);
			}
			case StopsType.area: {
				return (
					<div key="areas">
						<p>Wybrane obszary:</p>
						{areas.length > 0 && areas.map(item => (
							<p key={areasData[item]?.properties.id}>{areasData[item]?.properties.name}</p>
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
			ticketType === []
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
				{ticketType !== [] && (
					<div>Rodzaj biletów: {ticketType}</div>
				)}
			</div>
		);
	};

	renderServerInfoList = busId => {
		const { serverQueryData, busStopsData } = this.props.app;
		const filteredData = serverQueryData?.stats.filter(
			item => item.beginStop === busId,
		);
		const sortedData = filteredData.sort(
			(first, second) => second.passengers - first.passengers,
		);
		return sortedData?.map(item => {
			const start = busStopsData[item.beginStop];
			const destination = busStopsData[item.endStop];
			return (
				<button
					key={item.endStop}
					className="infoButton"
					onClick={() =>
						this.props.setHighlight([
							start.coordinates,
							destination.coordinates,
						])
					}>{`${destination.name}: ${item.passengers}`}</button>
			);
		});
	};

	renderCurrentInfo = currentInfo => {
		return (
			<>
				{currentInfo?.messages && (
					<div key="info">
						{currentInfo.messages.map((item, idx) => (
							<p key={`${idx}`}>{item}</p>
						))}
					</div>
				)}
				{currentInfo?.busId && this.renderServerInfoList(currentInfo.busId)}
				{currentInfo?.areaId && <></>}
			</>
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
const dispatchToProps = { setHighlight };

export default connect(mapStateToProps, dispatchToProps)(InfoPanelContent);
