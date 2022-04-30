import React, { Component } from "react";
import { ScrollView } from "@cantonjs/react-scroll-view";
import { connect } from "react-redux";
import Collapsible from "react-collapsible";
import { StopsType } from "../../redux/actionTypes";

class InfoPanelContent extends Component {

	renderPointInfo = (type, areas, stops) => {
		const { busStopsData } = this.props.app;
		switch (type) {
			case StopsType.all: {
				return <p>Wszystkie przystanki</p>;
			}
			case StopsType.one: {
				return (
					<div>
						<p>Wybrane przystanki:</p>
						{stops.map(item => (
							<p>{busStopsData[item].name}</p>
						))}
					</div>
				);
			}
			case StopsType.areas: {
				return (
					<div>
						<p>Wybrane obszary:</p>
						{areas.map(item => (
							<p>{item.properties.name}</p>
						))}
					</div>
				);
			}
		}
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
			},
		} = this.props;
		return (
			<>

					<ScrollView style={{ height: "100%" }}>
						<Collapsible trigger="Wybrany początek trasy">
							{this.renderPointInfo(startStopsType, startAreas, startBusStops)}
						</Collapsible>
						<Collapsible trigger="Wybrany koniec trasy">
							{this.renderPointInfo(endStopsType, endAreas, endBusStops)}
						</Collapsible>
					</ScrollView>
			</>
		);
	}
}

const mapStateToProps = state => state;
const dispatchToProps = {};

export default connect(mapStateToProps, dispatchToProps)(InfoPanelContent);
