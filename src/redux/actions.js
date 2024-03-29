import {
	UPDATE_START_BUS_STOP,
	UPDATE_END_BUS_STOP,
	UPDATE_START_STOPS_TYPE,
	UPDATE_END_STOPS_TYPE,
	UPDATE_START_COORDS,
	UPDATE_END_COORDS,
	SET_ACTIVE_POINT,
	SET_BUS_STOPS_VISIBILITY,
	SET_AREAS_VISIBILITY,
	SET_DRAW_MODE,
	SET_START_DATE,
	SET_END_DATE,
	SET_START_TIME,
	SET_END_TIME,
	SET_START_INTERVAL,
	SET_END_INTERVAL,
	SET_WEEKDAYS,
	SET_TICKET_TYPE,
	SET_ANALYSIS_TYPE,
	SET_BUS_STOPS_DATA,
	SET_AREAS_DATA,
	SET_SERVER_QUERY_DATA,
	SET_INFO,
	SET_LOADING,
	UPDATE_AREAS,
	SET_HIGHLIGHT,
	SET_DATA_NOT_FOUND,
	REVERSE_START_END,
	RESET_FILTERS
} from "./actionTypes";

export const setStartDate = content => ({
	type: SET_START_DATE,
	payload: {
		content,
	},
});

export const setEndDate = content => ({
	type: SET_END_DATE,
	payload: {
		content,
	},
});

export const setStartTime = content => ({
	type: SET_START_TIME,
	payload: {
		content,
	},
});

export const setEndTime = content => ({
	type: SET_END_TIME,
	payload: {
		content,
	},
});

export const setIntervalStart = content => ({
	type: SET_START_INTERVAL,
	payload: {
		content,
	},
});

export const setIntervalEnd = content => ({
	type: SET_END_INTERVAL,
	payload: {
		content,
	},
});

export const setWeekdays = content => ({
	type: SET_WEEKDAYS,
	payload: {
		content,
	},
});

export const setTicketsType = content => ({
	type: SET_TICKET_TYPE,
	payload: {
		content,
	},
});

export const updateStartAreas = content => ({
	type: UPDATE_START_COORDS,
	payload: {
		content,
	},
});

export const updateEndAreas = content => ({
	type: UPDATE_END_COORDS,
	payload: {
		content,
	},
});

export const updateStartStopsType = content => ({
	type: UPDATE_START_STOPS_TYPE,
	payload: {
		content,
	},
});

export const updateEndStopsType = content => ({
	type: UPDATE_END_STOPS_TYPE,
	payload: {
		content,
	},
});

export const updateStartBusStop = content => ({
	type: UPDATE_START_BUS_STOP,
	payload: {
		content,
	},
});

export const updateEndBusStop = content => ({
	type: UPDATE_END_BUS_STOP,
	payload: {
		content,
	},
});

export const setStartPoint = content => ({
	type: SET_ACTIVE_POINT,
	payload: {
		content,
	},
});

export const setBusStopsVisibility = content => ({
	type: SET_BUS_STOPS_VISIBILITY,
	payload: {
		content,
	},
});

export const setAreasVisibility = content => ({
	type: SET_AREAS_VISIBILITY,
	payload: {
		content,
	},
});

export const setDrawMode = content => ({
	type: SET_DRAW_MODE,
	payload: {
		content,
	},
});

export const setAnalysisType = content => ({
	type: SET_ANALYSIS_TYPE,
	payload: {
		content,
	},
});

export const setBusStopsData = content => ({
	type: SET_BUS_STOPS_DATA,
	payload: {
		content,
	},
});

export const setAreasData = content => ({
	type: SET_AREAS_DATA,
	payload: {
		content,
	},
});

export const updateAreasData = content => ({
	type: UPDATE_AREAS,
	payload: {
		content,
	},
});


export const setServerQueryData = content => ({
	type: SET_SERVER_QUERY_DATA,
	payload: {
		content,
	},
});

export const setInfo = content => ({
	type: SET_INFO,
	payload: {
		content,
	},
});

export const setLoading = content => ({
	type: SET_LOADING,
	payload: {
		content,
	},
});

export const setHighlight = content => ({
	type: SET_HIGHLIGHT,
	payload: {
		content,
	},
});

export const setDataNotFound = content => ({
	type: SET_DATA_NOT_FOUND,
	payload: {
		content,
	},
});


export const reverseStartEnd = content => ({
	type: REVERSE_START_END,
	payload: {
		content,
	},
});


export const resetFilters = content => ({
	type: RESET_FILTERS,
	payload: {
		content,
	},
});

