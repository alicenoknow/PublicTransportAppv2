import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { StopsType } from "../redux/actionTypes";
import {
	setBusStopsData,
	updateStartBusStop,
	updateEndBusStop,
	setNewAreaTitle,
	setAreasData,
	setDrawMode,
} from "../redux/actions";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import DeckGL from "@deck.gl/react";
import { data as busStopsData } from "../busStops.json";
import { data as oneWayData } from "../oneWay.json";
import {
	parsePointsToScatterPlotData,
	parseLinesToPoints,
	getDataPointsFromIds,
} from "./utils/parseGeoJSON";
import AreaTitleInput from "../components/AreaTitleInput";
import {
	LineLayer,
	PointLayer,
	getDrawLayer,
	drawAreas,
	HeatMapLayer,
} from "./layers";

class CustomMap extends Component {
	state = {
		viewport: {
			latitude: 50.1021742,
			longitude: 18.5462847,
			zoom: 13,
		},
		areaData: [],
	};

	componentDidMount() {
		this.props.setBusStopsData(busStopsData);
	}

	handleBusStopClick = info => {
		const {
			isStartPointActive,
			startStopsType,
			startBusStops,
			endStopsType,
			endBusStops,
		} = this.props.app;
		let newBusStops = [];

		if (isStartPointActive) {
			if (startStopsType === StopsType.one) {
				if (startBusStops.includes(info.object.id)) {
					newBusStops = startBusStops.filter(val => val !== info.object.id);
				} else {
					newBusStops = [...startBusStops, info.object.id];
				}
				this.props.updateStartBusStop(newBusStops);
			}
		} else {
			if (endStopsType === StopsType.one) {
				if (endBusStops.includes(info.object.id)) {
					newBusStops = endBusStops.filter(val => val !== info.object.id);
				} else {
					newBusStops = [...endBusStops, info.object.id];
				}
				this.props.updateEndBusStop(newBusStops);
			}
		}
	};

	renderBusStopsLayer = () => {
		const { busStopsData: data, showBusStops } = this.props.app;
		if (data && showBusStops) {
			const parsedData = parsePointsToScatterPlotData(data);
			return PointLayer(parsedData, "bus-stops", this.handleBusStopClick);
		}
		return null;
	};

	renderHeatMapLayer = () => {
		return HeatMapLayer(parseLinesToPoints(oneWayData.features, 0));
	};

	renderServerDrivenLayer = () => {
		return LineLayer(oneWayData);
	};

	renderAreas = () => {
		const {
			app: { showAreas, areasData },
		} = this.props;
		if (showAreas && areasData) {
			return drawAreas(areasData);
		}
		return null;
	};

	renderStartStops = () => {
		const {
			app: { startStopsType, startBusStops, busStopsData },
		} = this.props;
		if (startStopsType !== StopsType.one) {
			return null;
		}
		const data = getDataPointsFromIds(startBusStops, busStopsData);
		return PointLayer(
			data,
			"start-stops",
			this.handleBusStopClick,
			[204, 153, 59],
		);
	};

	renderEndStops = () => {
		const {
			app: { endStopsType, endBusStops, busStopsData },
		} = this.props;
		if (endStopsType !== StopsType.one) {
			return null;
		}
		const data = getDataPointsFromIds(endBusStops, busStopsData);
		return PointLayer(
			data,
			"end-stops",
			this.handleBusStopClick,
			[0, 184, 148],
		);
	};

	renderPickedStops = () => {
		const { isStartPointActive } = this.props.app;
		const renderFirstLayer = isStartPointActive
			? this.renderEndStops
			: this.renderStartStops;
		const renderSecondLayer = isStartPointActive
			? this.renderStartStops
			: this.renderEndStops;
		return [renderFirstLayer(), renderSecondLayer()];
	};

	renderDrawAreaLayer = () => {
		const { isDrawModeActive, newAreaTitle, areasData } = this.props.app;
		const { areaData } = this.state;
		if (!isDrawModeActive) {
			return null;
		}

		if (newAreaTitle && areaData) {
			const newArea = areaData.map(item => {
				return {
					...item,
					properties: {
						name: newAreaTitle,
					},
				};
			});
			this.props.setNewAreaTitle(undefined);
			this.props.setAreasData([...areasData, ...newArea]);
			this.props.setDrawMode(false);
			this.setState({ areaData: [] });
			return null;
		}

		const layer = getDrawLayer(areaData, data =>
			this.setState({ areaData: data }),
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
			this.renderDrawAreaLayer(),
			this.renderAreas(),
			this.renderBusStopsLayer(),
			...this.renderPickedStops(),
			drawAreas(showStartArea ? startArea : null, showEndArea ? endArea : null),
		];

		return (
			<Container fluid className="p-0 bg-light">
				<AreaTitleInput />
				<DeckGL
					initialViewState={this.state.viewport}
					controller={true}
					layers={layers}
					getTooltip={({ object }) => this.getCustomTooltip(object)}>
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
	setBusStopsData,
	updateStartBusStop,
	updateEndBusStop,
	setNewAreaTitle,
	setAreasData,
	setDrawMode,
};

export default connect(mapStateToProps, dispatchToProps)(CustomMap);
