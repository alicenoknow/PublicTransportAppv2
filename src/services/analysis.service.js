import { AnalysisType, StopsType } from "../redux/actionTypes";
import axios from "axios";

axios.defaults.withCredentials = true;

const API = process.env.REACT_APP_API;

export async function sendDataForAnalysis(state) {
	const filters = state.filters;
	const data = {
		startStopsType: state.startStopsType,
		endStopsType: state.endStopsType,
		startCoordinates: state.startAreaCoordinates,
		endCoordinates: state.endAreaCoordinates,
		startBusStop: state.startSingleBusStop,
		endBusStop: state.endSingleBusStop,
		analysisType: state.analysisType,
	};

	if (state.analysisType === AnalysisType.oneWay) {
		const dataOneWay = getDataForOneWay(data, filters);
		return await sendDataForOneWay(dataOneWay);
	} else {
		sendDataForTwoWay(data, filters);
	}
}

function getFormattedTime(time) {
	const hours = time?.getHours();
	const minutes = time?.getMinutes();

	if (hours !== undefined && minutes !== undefined) {
		return {
			hour: time.getHours(),
			minute: time.getMinutes(),
			second: 0,
			nano: 0,
		};
	}
	return undefined;
}

function getDataForOneWay(data, filters) {
	return {
		departureSelector: getStops(
			data.startStopsType,
			data.startBusStops,
			data.startAreas,
		),
		arrivalSelector: getStops(
			data.endStopsType,
			data.endBusStops,
			data.endAreas,
		),
		departureFilter: {
			startTime: getFormattedTime(filters.startTime),
			endTime: getFormattedTime(filters.endTime),
			startDate: filters.startDate?.toString() ?? undefined,
			endDate: filters.endDate?.toString() ?? undefined,
			weekdays: filters.weekdays,
		},
	};
}

export const sendDataForOneWay = rawData => {
	const data = JSON.stringify(rawData);

	const config = {
		method: "post",
		url: API + "/api/one-way",
		headers: {
			"Content-Type": "application/json",
		},
		data: data,
		withCredentials: true,
	};

	return axios(config)
		.then(function (response) {
			return response?.data;
		})
		.catch(function (error) {
			console.log(error);
			return;
		});
};

function sendDataForTwoWay(data, filters) {}

function getStops(stopsType, selectedStops, selectedAreas) {
	if (stopsType === StopsType.all) {
		return {
			type: "busStation",
			ids: [],
		};
	} else if (stopsType === StopsType.area) {
		return {
			type: "area",
			ids: selectedAreas,
		};
	}
	return {
		type: "busStation",
		ids: selectedStops,
	};
}
