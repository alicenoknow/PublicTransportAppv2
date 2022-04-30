import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { StopsType } from "../redux/actionTypes";
import {
	updateStartAreaCoordinates,
	updateEndAreaCoordinates,
} from "../redux/actions";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import DeckGL from "@deck.gl/react";
import { features as busStopsData } from "../busStops.json";
import { data as oneWayData } from "../oneWay.json";
import {
	parsePointsToScatterPlotData,
	parseLinesToPoints,
} from "./utils/parseGeoJSON";
import { LineLayer, PointLayer, getDrawLayer, drawAreas, HeatMapLayer } from "./layers";

class CustomMap extends Component {
	state = {
		viewport: {
			latitude: 50.1021742,
			longitude: 18.5462847,
			zoom: 13,
		},
		startArea: { type: "FeatureCollection", features: [] },
		endArea: { type: "FeatureCollection", features: [] },
		startPoint: undefined,
		endPoint: undefined,
	};

	renderBusStopsLayer = () => {
		return PointLayer(parsePointsToScatterPlotData(busStopsData));
	};

	renderHeatMapLayer = () => {
		return HeatMapLayer(parseLinesToPoints(oneWayData.features, 0))
	};

	renderServerDrivenLayer = () => {
		return LineLayer(oneWayData);
	};

	renderDrawStartAreaLayer = () => {
		const {
			updateStartAreaCoordinates,
			app: { startStopsType, isStartPointActive },
		} = this.props;
		if (startStopsType !== StopsType.area || !isStartPointActive) {
			return null;
		}
		const setStateData = data => this.setState({ startArea: data });
		const layer = getDrawLayer(
			this.state.startArea,
			setStateData,
			updateStartAreaCoordinates,
			true,
		);
		return layer;
	};

	renderDrawEndAreaLayer = () => {
		const {
			updateEndAreaCoordinates,
			app: { endStopsType, isStartPointActive },
		} = this.props;
		if (endStopsType !== StopsType.area || isStartPointActive) {
			return null;
		}
		const setStateData = data => this.setState({ endArea: data });
		const layer = getDrawLayer(
			this.state.endArea,
			setStateData,
			updateEndAreaCoordinates,
			false,
		);
		return layer;
	};

	onClickUpdate = clickEvent => {
		const { app, updateCoordinates, pointData } = this.props;
		const coords = [
			parseFloat(Number(clickEvent.lngLat.lng).toFixed(3)),
			parseFloat(Number(clickEvent.lngLat.lat).toFixed(3)),
		];
		const cut = pointData.features?.map(item => [
			parseFloat(Number(item.geometry.coordinates[0]).toFixed(3)),
			parseFloat(Number(item.geometry.coordinates[1]).toFixed(3)),
			item.properties.id,
			item.properties.name,
		]);
		const filtered = cut.filter(
			item => item[0] === coords[0] && item[1] === coords[1],
		);
		if (!filtered || !filtered[0]) return;
		if (app.stopsType === StopsType.one) {
			updateCoordinates(filtered[0][2]);
		}
		if (filtered[0].length < 4) {
			return;
		}
		this.setState({
			popUpCoordinates: {
				lon: clickEvent.lngLat.lng,
				lat: clickEvent.lngLat.lat,
			},
			showPopUp: true,
			popUpText: filtered[0][3],
		});
	};

	getCustomTooltip = object => {
		if (!object) {
			return;
		}
		if (object?.name) {
			return object.name;
		}
	};

	render() {
		const { startArea, endArea } = this.state;
		const {
			app: { startStopsType, endStopsType },
		} = this.props;
		const showStartArea = startStopsType === StopsType.area;
		const showEndArea = endStopsType === StopsType.area;

		const layers = [
			this.renderHeatMapLayer(),
			this.renderServerDrivenLayer(),
			this.renderDrawStartAreaLayer(),
			this.renderDrawEndAreaLayer(),
			this.renderBusStopsLayer(),
			drawAreas(showStartArea ? startArea : null, showEndArea ? endArea : null),
		];

		return (
			<Container fluid className="p-0 bg-light">
				<DeckGL
					initialViewState={this.state.viewport}
					controller={true}
					layers={layers}
					getTooltip={({ object }) => this.getCustomTooltip(object)}
				>
					<ReactMapGL
						mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
						mapStyle="mapbox://styles/mapbox/streets-v9"
						width={window.innerWidth}
						height={window.innerHeight}
						onViewportChange={viewport => this.setState({ viewport })}
					/>
				</DeckGL>
			</Container>
		);
	}
}

const mapStateToProps = state => state;
const dispatchToProps = {
	updateStartAreaCoordinates,
	updateEndAreaCoordinates,
};

export default connect(mapStateToProps, dispatchToProps)(CustomMap);
