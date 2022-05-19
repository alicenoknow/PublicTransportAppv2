import { AnalysisType, StopsType } from "../redux/actionTypes";
import axios from "axios";

axios.defaults.withCredentials = true;

const API = process.env.REACT_APP_API;
const ONE_WAY_API = "/api/one-way";
const TWO_WAY_API = "/api/two-way";

function isOneWay(analysisTypes) {
	const twoWay = analysisTypes.find(item => item.type === AnalysisType.oneWay);
	return twoWay.isChecked;
}

export async function sendDataForAnalysis(state) {
	const filters = state.filters;
	const data = {
		startStopsType: state.startStopsType,
		endStopsType: state.endStopsType,
		startCoordinates: state.startAreas,
		endCoordinates: state.endAreas,
		startBusStop: state.startBusStops,
		endBusStop: state.endBusStops,
		analysisType: state.analysisType,
	};
	if (isOneWay(state.analysisType)) {
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
			data.startBusStop,
			data.startCoordinates,
		),
		arrivalSelector: getStops(
			data.endStopsType,
			data.endBusStop,
			data.endCoordinates,
		),
		departureFilter: {
			startTime: getFormattedTime(filters.startTime),
			endTime: getFormattedTime(filters.endTime),
			startDate: filters.startDate ? new Date(filters.startDate).toISOString().split("T")[0] : undefined,
			endDate: filters.endDate ? new Date(filters.endDate)?.toISOString().split("T")[0] : undefined,
			weekdays: filters.weekDays.filter(day => day.isChecked).map(day => day.id),
			ticketType: filters.ticketType.filter(ticket => ticket.isChecked).map(ticket => ticket.type),
		},
	};
}

function getFormattedInterval(interval) {
	return interval !== undefined ?  `${('00'+ interval).slice(-2)}:00` : undefined;
}

function getDataForTwoWay(data, filters) {
	return {
		departureSelector: getStops(
			data.startStopsType,
			data.startBusStop,
			data.startCoordinates,
		),
		arrivalSelector: getStops(
			data.endStopsType,
			data.endBusStop,
			data.endCoordinates,
		),
		departureFilter: {
			startTime: getFormattedTime(filters.startTime),
			endTime: getFormattedTime(filters.endTime),
			startDate: filters.startDate?.toString() ?? undefined,
			endDate: filters.endDate?.toString() ?? undefined,
			weekdays:  filters.weekDays.filter(day => day.isChecked).map(day => day.id),
			ticketType: filters.ticketType.filter(ticket => ticket.isChecked).map(ticket => ticket.type),
			returnDelayMin: getFormattedInterval(filters.intervalStartTime),
			returnDelayMax: getFormattedInterval(filters.intervalEndTime),
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
			return error?.response?.status;
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
