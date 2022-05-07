import { AnalysisType, StopsType } from "../redux/actionTypes";
import axios from "axios";

axios.defaults.withCredentials = true;

const API = process.env.REACT_APP_API;
const ONE_WAY_API = "/api/one-way";
const TWO_WAY_API = "/api/two-way";

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
		return await sendData(dataOneWay, ONE_WAY_API);
	} else {
		const dataTwoWay = getDataForTwoWay(data, filters);
		return await sendData(dataTwoWay, TWO_WAY_API);
	}
}

function getFormattedTime(time) {
	const hours = time?.getHours();
	const minutes = time?.getMinutes();

	if (hours !== undefined && minutes !== undefined) {
		return `${('00'+ hours).slice(-2)}:${('00'+ minutes).slice(-2)}`
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
			weekdays: filters.weekDays,
			ticketType: filters.ticketType,
		},
	};
}

function getDataForTwoWay(data, filters) {
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
			weekdays: filters.weekDays,
			ticketType: filters.ticketType,
			//TODO interval
		},
	};
}

export const sendData = (rawData, url) => {
	const data = JSON.stringify(rawData);

	const config = {
		method: "post",
		url: API + url,
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

function getStops(stopsType, selectedStops, selectedAreas) {
	if (stopsType === StopsType.all) {
		return undefined
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
