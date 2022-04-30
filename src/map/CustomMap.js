import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { StopsType } from "../redux/actionTypes";
import {
	updateStartAreaCoordinates,
	updateEndAreaCoordinates,
	setBusStopsData,
	updateStartBusStop,
	updateEndBusStop
} from "../redux/actions";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import DeckGL from "@deck.gl/react";
import { data as busStopsData } from "../busStops.json";
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

	componentDidMount() {
		this.props.setBusStopsData(busStopsData);
	}

	handleBusStopClick = (info) => {
		const { isStartPointActive, startStopsType, startBusStops, endStopsType, endBusStops } = this.props.app;
		let newBusStops = [];

		if (isStartPointActive) {
			if (startStopsType === StopsType.one) {
				if (startBusStops.includes(info.object.id)) {
					newBusStops = startBusStops.filter(val => val !== info.object.id);
				} else {
					newBusStops = [ ...startBusStops, info.object.id];
				}
				this.props.updateStartBusStop(newBusStops);
			}
		} else {
			if (endStopsType === StopsType.one) {
				if (endBusStops.includes(info.object.id)) {
					newBusStops = endBusStops.filter(val => val !== info.object.id);
				} else {
					newBusStops = [ ...endBusStops, info.object.id];
				}
				this.props.updateEndBusStop(newBusStops)
			}
		}
	}

	renderBusStopsLayer = () => {
		const { busStopsData: data, showBusStops } = this.props.app;
		if (data && showBusStops) {
			const parsedData = parsePointsToScatterPlotData(data);
			return PointLayer(parsedData, this.handleBusStopClick);
		}
		return null;
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
	setBusStopsData,
	updateStartBusStop,
	updateEndBusStop,
};

export default connect(mapStateToProps, dispatchToProps)(CustomMap);
