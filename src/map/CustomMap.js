import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { StopsType } from "../redux/actionTypes";
import {
	setBusStopsData,
	updateStartBusStop,
	updateEndBusStop,
	setAreasData,
	setDrawMode,
	updateStartAreas,
	updateEndAreas,
	setInfo
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

	handleAreaClick = info => {
		const {
			isStartPointActive,
			startStopsType,
			startAreas,
			endStopsType,
			endAreas,
		} = this.props.app;
		let newAreas = [];
		this.props.setInfo("Wybrano obszar: " + info.object.properties.name);
		if (isStartPointActive) {
			if (startStopsType === StopsType.area) {
				if (startAreas.includes(info.object.properties.id)) {
					newAreas = startAreas.filter(
						val => val !== info.object.properties.id,
					);
				} else {
					newAreas = [...startAreas, info.object.properties.id];
				}
				this.props.updateStartAreas(newAreas);
			}
		} else {
			if (endStopsType === StopsType.area) {
				if (endAreas.includes(info.object.properties.id)) {
					newAreas = endAreas.filter(val => val !== info.object.properties.id);
				} else {
					newAreas = [...endAreas, info.object.properties.id];
				}
				this.props.updateEndAreas(newAreas);
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
			return drawAreas(
				Object.values(areasData),
				this.handleAreaClick,
				"all-areas",
				[80, 140, 250, 120],
				[90, 120, 180, 255],
			);
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

	getRandomInt = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	};

	renderDrawAreaLayer = () => {
		const { isDrawModeActive } = this.props.app;
		const { areaData } = this.state;
		if (!isDrawModeActive) {
			return null;
		}
		const layer = getDrawLayer(areaData, data =>
			this.setState({ areaData: data }),
		);
		return layer;
	};

	onNewAreaSubmit = title => {
		const { areaData } = this.state;
		const {
			app: { areasData },
		} = this.props;
		if (title && areaData) {
			const newArea = areaData.map(item => {
				return {
					...item,
					properties: {
						id: this.getRandomInt(1, 1000),
						name: title,
					},
				};
			});
			this.props.setDrawMode(false);
			this.props.setAreasData([...Object.values(areasData), ...newArea]);
			this.setState({ areaData: [] });
			return null;
		}
	};

	getStartAndEndAreas = (showStart, showEnd) => {
		const { areasData, startAreas, endAreas } = this.props.app;
		let areas = [];
		if (showStart) {
			areas = startAreas.map(item => ({
				...areasData[item],
				properties: { ...areasData[item].properties, isStart: true },
			}));
		}
		if (showEnd) {
			areas = [
				...areas,
				...endAreas.map(item => ({
					...areasData[item],
					properties: { ...areasData[item].properties, isStart: false },
				})),
			];
		}
		return areas ?? [];
	};

	renderPickedAreas = () => {
		const {
			app: { startStopsType, endStopsType },
		} = this.props;
		const showStartArea = startStopsType === StopsType.area;
		const showEndArea = endStopsType === StopsType.area;

		if (!showEndArea && !showStartArea) {
			return null;
		}
		const areas = this.getStartAndEndAreas(showStartArea, showEndArea);
		return drawAreas(areas, this.handleAreaClick, "start-end-areas");
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
		const { isDrawModeActive } = this.props.app;
		const layers = [
			this.renderHeatMapLayer(),
			this.renderServerDrivenLayer(),
			this.renderDrawAreaLayer(),
			this.renderAreas(),
			this.renderBusStopsLayer(),
			...this.renderPickedStops(),
			this.renderPickedAreas(),
		];

		return (
			<Container fluid className="p-0 bg-light">
				{isDrawModeActive && (
					<AreaTitleInput setAreaTitle={title => this.onNewAreaSubmit(title)} />
				)}
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
	setAreasData,
	setDrawMode,
	updateStartAreas,
	updateEndAreas,
	setInfo
};

export default connect(mapStateToProps, dispatchToProps)(CustomMap);
