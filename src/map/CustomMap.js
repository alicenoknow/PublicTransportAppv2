import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { StopsType } from "../redux/actionTypes";
import {
	updateStartBusStop,
	updateEndBusStop,
	setAreasData,
	setDrawMode,
	updateStartAreas,
	updateEndAreas,
	setInfo,
	setLoading,
} from "../redux/actions";
import ReactMapGL, { LinearInterpolator } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import DeckGL from "@deck.gl/react";
import { WebMercatorViewport } from "@deck.gl/core";
import {
	parsePointsToScatterPlotData,
	getDataPointsFromIds,
	parseArrayToHeatmap,
	parseArrayToLines,
} from "./utils/parseGeoJSON";
import AreaTitleInput from "../components/AreaTitleInput";
import NoDataAlert from "../components/NoDataAlert";
import {
	LineLayer,
	PointLayer,
	getDrawLayer,
	drawAreas,
	HeatMapLayer,
	HighlightLayer,
} from "./layers";
import { addArea } from "../services/areas.service.js";

/* eslint-disable import/no-webpack-loader-syntax */
import mapboxgl from "mapbox-gl";
// @ts-ignore
mapboxgl.workerClass =
	require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

class CustomMap extends Component {
	state = {
		viewport: {
			latitude: 50.1021742,
			longitude: 18.5462847,
			zoom: 13,
			transitionInterruption: () => {},
		},
		areaData: [],
	};

	componentDidUpdate(prevProps) {
		const { highlightData: data } = this.props.app;
		if (data !== prevProps.app.highlightData && data) {
			this.fitCoordinates(data);
		}
	}

	fitCoordinates = data => {
		const { viewport } = this.state;
		const viewportWebMercator = new WebMercatorViewport(viewport);
		const latitudes = data.map(item => item[0]);
		const longitudes = data.map(item => item[1]);

		const { longitude, latitude, zoom } = viewportWebMercator.fitBounds(
			[
				[Math.min(...latitudes), Math.min(...longitudes)],
				[Math.max(...latitudes), Math.max(...longitudes)],
			],
			{
				padding: 300,
			},
		);
		this.setState({
			viewport: {
				...viewport,
				longitude,
				latitude,
				zoom,
				transitionInterpolator: new LinearInterpolator(),
				transitionDuration: 1000,
			},
		});
	};

	handleBusStopClick = info => {
		const {
			isStartPointActive,
			startStopsType,
			startBusStops,
			endStopsType,
			endBusStops,
			serverQueryData,
			busStopsData,
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
		if (serverQueryData) {
			this.props.setInfo({
				messages: [
					`Pasażerowie na trasie z przystanku ${
						busStopsData[info.object.id].name
					} do:`,
				],
				busId: info.object.id,
			});
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
		this.props.setInfo({
			messages: ["Wybrano obszar: " + info.object.properties.name],
		});
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

	handleLineClick = info => {
		this.props.setInfo({
			messages: [
				"Trasa z przystanku " +
					info.object.geometry.coordinates[0] +
					" do przystanku " +
					info.object.geometry.coordinates[1] +
					".",
				"Liczba pasażerów: " + info.object.properties.commuters,
			],
		});
	};

	renderBusStopsLayer = () => {
		const { busStopsData: data, showBusStops } = this.props.app;
		if (data && showBusStops) {
			const parsedData = parsePointsToScatterPlotData(data);
			return PointLayer(parsedData, "bus-stops", this.handleBusStopClick);
		}
		return null;
	};

	renderServerDrivenLayer = () => {
		const { serverQueryData: data, busStopsData } = this.props.app;
		if (!data?.type || !data?.stats) {
			return null;
		}
		if (data.type === "ALL") {
			const dataToDraw = parseArrayToHeatmap(data.stats, busStopsData);
			return HeatMapLayer(dataToDraw);
		}
		const linesData = parseArrayToLines(data.stats, busStopsData);
		return LineLayer(linesData, this.handleLineClick);
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
				[80, 140, 250, 100],
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

	onNewAreaSubmit = async title => {
		const { areaData } = this.state;
		const {
			app: { areasData },
		} = this.props;
		if (title && areaData) {
			this.props.setLoading(true);
			const newID = await addArea(title, areaData[0].geometry.coordinates);
			this.props.setLoading(false);

			if (newID) {
				const newArea = {
					...areaData[0],
					properties: {
						name: title,
						id: newID,
					},
				};
				this.props.setAreasData([...Object.values(areasData), newArea]);
			}
			this.props.setDrawMode(false);
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

	renderHighlight = () => {
		const data = this.props.app.highlightData;
		if (data) {
			return HighlightLayer(data);
		}
		return null;
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
			this.renderAreas(),
			this.renderServerDrivenLayer(),
			this.renderDrawAreaLayer(),
			this.renderPickedAreas(),
			this.renderServerDrivenLayer(),
			this.renderHighlight(),
			this.renderBusStopsLayer(),
			...this.renderPickedStops(),
		];
		return (
			<Container fluid className="p-0 bg-light">
				{isDrawModeActive && (
					<AreaTitleInput
						setAreaTitle={title => this.onNewAreaSubmit(title)}
						setDrawMode={() => {
							this.setState({ areaData: [] });
							this.props.setDrawMode(false);
						}}
					/>
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
				{this.props.app.dataNotFound && <NoDataAlert />}
			</Container>
		);
	}
}

const mapStateToProps = state => state;
const dispatchToProps = {
	updateStartBusStop,
	updateEndBusStop,
	setAreasData,
	setDrawMode,
	updateStartAreas,
	updateEndAreas,
	setInfo,
	setLoading,
};

export default connect(mapStateToProps, dispatchToProps)(CustomMap);
